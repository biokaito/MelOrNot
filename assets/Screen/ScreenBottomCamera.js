import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text,Button,FlatList, Image, ImageBackground } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { fetch, bundleResourceIO } from "@tensorflow/tfjs-react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as jpeg from "jpeg-js";
import AntDesign from '@expo/vector-icons/AntDesign';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { Icon } from 'react-native-elements';
//import { BlurView } from "@react-native-community/blur";
//import { withNavigation } from 'react-navigation';
//import { Camera } from 'expo-camera';

import Output from "./Output";

var id = 0;

async function getPermissionAsync() {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Permission for camera access required.");
    }
    const { statusCam } = await Permissions.askAsync(Permissions.CAMERA);
    if (statusCam !== "granted") {
      alert("Permission for camera access required.");
    }
  }
}

async function imageToTensor(source) {
  //Load dữ liệu thô từ ảnh được select vào mảng
  const response = await fetch(source.uri, {}, { isBinary: true });
  const rawImageData = await response.arrayBuffer();
  const { width, height, data } = jpeg.decode(rawImageData, {
    useTArray: true, // Uint8Array = true
  });

  // loại bỏ alpha channel:
  const buffer = new Uint8Array(width * height * 3);
  let offset = 0;
  for (let i = 0; i < buffer.length; i += 3) {
    buffer[i] = data[offset];
    buffer[i + 1] = data[offset + 1];
    buffer[i + 2] = data[offset + 2];
    offset += 4;
  }

  // chuyển đổi ảnh sang dạng tensor
  const img = tf.tensor3d(buffer, [width, height, 3]);

  // tính toán cắt ảnh 
  const shorterSide = Math.min(width, height);
  const startingHeight = (height - shorterSide) / 2;
  const startingWidth = (width - shorterSide) / 2;
  const endingHeight = startingHeight + shorterSide;
  const endingWidth = startingWidth + shorterSide;

  // cắt và resize ảnh 224x224
  const sliced_img = img.slice(
    [startingWidth, startingHeight, 0],
    [endingWidth, endingHeight, 3]
  );
  const resized_img = tf.image.resizeBilinear(sliced_img, [224, 224]);

  // thêm dimension thứ 4 vào tensor
  const expanded_img = resized_img.expandDims(0);

  // chuẩn hóa các giá trị rgb thành -1-+1
  return expanded_img.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
}

export default function ScreenBottomCamera({navigation}) {  
  const [isTfReady, setTfReady] = useState(false); 
  const [model, setModel] = useState(null); 
  const [image, setImage] = useState(null); 
  const [predictions, setPredictions] = useState(null); 
  const [error, setError] = useState(false); 
  const [singleImage, setsingleImage] = useState({});
  const [gallery, setGallery] = useState({
    source: '', 
    akiec: '',
    bcc: '',
    bkl: '',
    df: '',
    melanoma: '',
    nv: '',
    vasc: '',
    date : '',
    time : '',
    id : ''
  });
  const [isSave, setIsSave] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [currrentTime, setCurrentTime] = useState('');

  const [definitions,setdefinitions] = useState([
    {   
      acronym: 'akiec',
      image : require("../src/images/knowlegde.png"),
      sampleImage : require("../src/images/akiec.jpg"),
      title : 'Actinic Keratoses and intraepithelial Carcinoma',
      id : '1',
      content: 'Actinic Keratoses (Solar Keratoses) and intraepithelial Carcinoma (Bowen’s disease) are common non-invasive, variants of squamous cell car- cinoma that can be treated locally without surgery. Some authors regard them as precursors of squamous cell carcinomas and not as actual carci- nomas. There is, however, agreement that these lesions may progress to invasive squamous cell carcinoma - which is usually not pigmented. Both neoplasms commonly show surface scaling and commonly are devoid of pigment. Actinic keratoses are more common on the face and Bowenâ€™s disease is more common on other body sites. Because both types are in- duced by UV-light the surrounding skin is usually typified by severe sun damaged except in cases of Bowen’s disease that are caused by human papilloma virus infection and not by UV.'
    },
    {
      acronym: 'bcc',
      image : require("../src/images/knowlegde.png"),
      sampleImage : require("../src/images/bcc.jpg"),
      title : 'Basal Cell Carcinoma',
      id : '2',
      content: 'Basal cell carcinoma is a common variant of epithelial skin cancer that rarely metastasizes but grows destructively if untreated. It appears in different morphologic variants (flat, nodular, pigmented, cystic).'
    },
    {
      acronym: 'bkl',
      image : require("../src/images/knowlegde.png"),
      sampleImage : require("../src/images/bkl.jpg"),
      title : 'Benign Keratosis',
      id : '3',
      content: '"Benign keratosis" is a generic class that includes seborrheic keratoses ("senile wart"), solar lentigo - which can be regarded a flat variant of seborrheic keratosis - and lichen-planus like keratoses (LPLK), which corresponds to a seborrheic keratosis or a solar lentigo with inflammation and regression. The three subgroups may look different dermatoscopically, but we grouped them together because they are similar biologically and often reported under the same generic term histopathologically. From a dermatoscopic view, lichen planus-like keratoses are especially challenging because they can show morphologic features mimicking melanoma and are often biopsied or excised for diagnostic reasons. The dermatoscopic appearance of seborrheic keratoses varies according to anatomic site and type.'
    },
    {
      acronym: 'df',
      image : require("../src/images/knowlegde.png"),
      sampleImage : require("../src/images/df.jpg"),
      title : 'Dermatofibroma',
      id : '4',
      content: 'Dermatofibroma is a benign skin lesion regarded as either a benign proliferation or an inflammatory reaction to minimal trauma. The most common dermatoscopic presentation is reticular lines at the periphery with a central white patch denoting fibrosis.'
    },
    {
      acronym: 'mel',
      image : require("../src/images/knowlegde.png"),
      sampleImage : require("../src/images/mel.jpg"),
      title : 'Melanoma',
      id : '5',
      content: 'Melanoma is a malignant neoplasm derived from melanocytes that may appear in different variants. If excised in an early stage it can be cured by simple surgical excision. Melanomas can be invasive or noninvasive (in situ). We included all variants of melanoma including melanoma in situ, but did exclude non-pigmented, subungual, ocular or mucosal melanoma. Melanomas are usually, albeit not always, chaotic, and some melanoma specific criteria depend on anatomic site.'
    },
    {
      acronym: 'nv',
      image : require("../src/images/knowlegde.png"),
      sampleImage : require("../src/images/nv.jpg"),
      title : 'Melanocytic Nevi',
      id : '6',
      content:'Melanocytic nevi are benign neoplasms of melanocytes and appear in a myriad of variants, which all are included in our series. The variants may differ significantly from a dermatoscopic point of view. In contrast to melanoma they are usually symmetric with regard to the distribution of color and structure.'
    },
    {
      acronym: 'vasc',
      image : require("../src/images/knowlegde.png"),
      sampleImage : require("../src/images/vasc.jpg"),
      title : 'Vascular Lesions',
      id : '7',
      content: 'Vascular skin lesions in the dataset range from cherry angiomas to angiokeratomas and pyogenic granulomas. Hemorrhage is also included in this category. Angiomas are dermatoscopically characterized by red or purple color and solid, well circumscribed structures known as red clods or lacunes.'
    },
])

  useEffect(() => {
    (async () => {
      await tf.ready(); 
      setTfReady(true); 
      
      // khai báo và load model custom
      const model = require("./Model/NewModel1/model.json");
      const weights = require("./Model/NewModel1/weights.bin");
      const loadedModel = await tf.loadLayersModel(
        bundleResourceIO(model, weights)
      );
      setModel(loadedModel); 
      getPermissionAsync(); 

      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      setCurrentDate(
        date + '/' + month + '/' + year 
      );
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); 
      setCurrentTime(
        hours + ':' + min + ':' + sec
      );
    })();
  }, []);
  
  async function handlerSelectImage() {
    try {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, // on Android user can rotate and crop the selected image; iOS users can only crop
        quality: 1, // Chất lượng ảnh cao nhất
        aspect: [4, 3], // duy trì tỷ lệ chuẩn
        //base64: true
      });
      //console.log(response.uri)
      if (!response.cancelled) {
        const source = { uri: response.uri };
        setImage(source); 
        const imageTensor = await imageToTensor(source); 
        const predictions = await model.predict(imageTensor); // send the image to the model
        setPredictions(predictions); 
        //console.log(response.uri)
      }
    } catch (error) {
      setError(error);
    }
  }
  async function handlerCaptureImage(){
    try{
      let response = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
      });
      //console.log(response.uri)
      if (!response.cancelled) {
        const source = { uri: response.uri };
        setImage(source); // put image path to the state
        const imageTensor = await imageToTensor(source); // prepare the image
        const predictions = await model.predict(imageTensor); // send the image to the model
        setPredictions(predictions); // put model prediction to the state
      }
    } catch (error) {
      setError(error);
    }    
  }

  async function reset() {
    setPredictions(null);
    setImage(null);
    setError(false);
  }
  
  const _storeData = async () => {
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      setCurrentDate(
        date + '/' + month + '/' + year 
      );
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); 
      setCurrentTime(
        hours + ':' + min + ':' + sec
      );
       id = id + 1
        setGallery({
        source: image.uri, 
        akiec: Math.round(predictions.dataSync()[0] * 100),
        bcc: Math.round(predictions.dataSync()[1] * 100),
        bkl: Math.round(predictions.dataSync()[2] * 100),
        df: Math.round(predictions.dataSync()[3] * 100),
        melanoma: Math.round(predictions.dataSync()[4] * 100),
        nv: Math.round(predictions.dataSync()[5] * 100),
        vasc: Math.round(predictions.dataSync()[6] * 100),
        date : currentDate,
        time : currrentTime,
        id : id
      })
    setIsSave(!isSave)
    reset()
    console.log(gallery)
    navigation.navigate('Repo',{
      gallery: {
        source: image.uri, 
        akiec: Math.round(predictions.dataSync()[0] * 100),
        bcc: Math.round(predictions.dataSync()[1] * 100),
        bkl: Math.round(predictions.dataSync()[2] * 100),
        df: Math.round(predictions.dataSync()[3] * 100),
        melanoma: Math.round(predictions.dataSync()[4] * 100),
        nv: Math.round(predictions.dataSync()[5] * 100),
        vasc: Math.round(predictions.dataSync()[6] * 100),
        date : currentDate,
        time : currrentTime,
        id : id
      }
    })
    
  };

  let status, statusMessage, showReset;
  const resetLink = (
    <View style={styles.resetLink}>
      <View>
        <TouchableOpacity onPress={reset} style={styles.restartButton}>
          <Text style={styles.reset}>
            Restart
          </Text>
        </TouchableOpacity>
      </View>
      {
        !error?
        <View>
          <TouchableOpacity style={styles.restartButton} onPress={_storeData}>
            <Text style={styles.reset} >Save</Text>
          </TouchableOpacity>
        </View>
        :
        null
      }
    </View>
  );

  if (!error) {
      if (isTfReady && model && !image && !predictions) {
        status = "modelReady";
        statusMessage = "Model is ready.";
      } else if (model && image && predictions) {
        status = "finished";
        //statusMessage = "Prediction finished.";
        showReset = true;
      } else if (model && image && !predictions) {
        status = "modelPredict";
        statusMessage = "Predicting...";
      } else {
        status = "modelLoad";
        statusMessage = "Model is loading...";
      }
  } else {
      //statusMessage = "Can't identify your image!";
      showReset = true;
      //console.log("loi la"+error);
  }
 

  return (
    <View style={styles.container}>        
        <View  style={styles.camera}>       
        <TouchableOpacity
          onPress={model && !predictions ? handlerCaptureImage : () => {}}         
        >
          <AntDesign name="camerao" size={50} />
        </TouchableOpacity>       
      </View>
      <View  style={styles.repo}>       
        <TouchableOpacity
          //onPress={model && !predictions ? handlerCaptureImage : () => {}}         
          onPress={()=>{navigation.navigate('Repo')}}
        >
          <AntDesign name="folder1" size={50} />
        </TouchableOpacity>       
      </View>
      <View style={styles.innercontainer}>         
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={model && !predictions ? handlerSelectImage : () => {}} // Activates handler only if the model has been loaded and there are no predictions done yet
        >
          <Output
            status={status}
            image={image}
            predictions={predictions}
            error={error}
          />
        </TouchableOpacity>        
        <Text style={styles.status}>
          {statusMessage} {showReset ? resetLink : null}
          
        </Text>        
      </View>      
      <View style={styles.footer}>        
        {
         image ?
         <View style={styles.yourImage}>
          <Text style={styles.yourImageText}>Your image:</Text>
          <Image
            source={image}
            style={styles.yourImageFooter}
          >
          </Image>
         </View>
        : null
       }
      </View>
      <Modal isVisible={isSave} onBackdropPress={() => {setIsSave(!isSave)}}>
          <View style={styles.containerAlert}>
            <Image 
                source={require('../src/images/tick.png')}
                style={styles.imageAlert}
            />
            <Text style={styles.nameAlert}>Saved!</Text>
          </View>
        </Modal>


      {/*<View style={styles.Definitions}>
      <Text style={{ marginLeft: 4,fontFamily: "Roboto-Bold", fontSize: 18, color: "black" }}>Definitions:</Text>
        <View>
          <FlatList
            horizontal={true}
            data={definitions}
            renderItem={({item})=>{
              return(
                <View style={styles.flatList}>
                  <TouchableOpacity
                    onPress={()=>navigation.navigate("Definitions",{
                      definitions: item
                    })}                  
                  >
                    <Image 
                      source={item.image}
                      style={styles.flatlistImage}
                    />
                    <Text style={styles.flatlistTitle}>{item.acronym}</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
          >            
          </FlatList>
        </View>        
          </View>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f4f2",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  restartButton:{
    //backgroundColor: 'black',
    padding: 3,
  },
  yourImageText:{
    fontSize: 20,
  },
  yourImageFooter:{
    height: 100, 
    width: 100,
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey'
  },
  footer:{
    height:140,
    width:300, 
    position: 'absolute',
    bottom: 5, 
    //backgroundColor:'red',
    alignItems:'center',
    justifyContent: 'center'
  },
  yourImage:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  camera:{
    position: 'absolute',
    top: 40,
    right: 40
  },  
  repo:{
    position: 'absolute',
    top: 40,
    left: 40
  },
  resetLink:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200
  },
  flatList:{
    padding: 4,
    marginBottom: 0,
  },
  shadowIcon:{
    shadowOpacity: 2,
    textShadowRadius: 3,
    textShadowOffset: { 
      width: 1, 
      height: 3 
    }
  },
  Definitions:{
    position: 'absolute',
    bottom: 20
  },
  innercontainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  status: { 
    marginTop: 20,
    fontSize: 20
  },
  reset: { 
    color: "blue",
    fontSize: 20,
    
    fontFamily: 'HelveticaNeue-Bold'
  },
  imageContainer: {
    width: 350,
    height: 300,
    borderRadius: 20,
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  flatlistImage:{
    width: 50,
    height: 100,
    marginRight: 0,
},
flatlistTitle:{
    position: 'absolute',
    color: 'black',
    fontWeight: 'bold',
    marginTop: 4,
    fontSize: 14,
    left: "25%",
    bottom: 0
},
containerAlert: {
  backgroundColor: '#fff',
  borderRadius: 25,
  justifyContent: 'center',
  height: 200,
  width: 200,
  alignSelf: 'center'
},
imageAlert: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginBottom: 20,
},
nameAlert: {
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
},
});
