import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text,Button } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { fetch, bundleResourceIO } from "@tensorflow/tfjs-react-native";
import Constants from "expo-constants";
import { Camera } from 'expo-camera';
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as jpeg from "jpeg-js";
import { Icon } from 'react-native-elements';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

import Output from "./Output";


async function getPermissionAsync() {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
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

  // thêm demension thứ 4 vào tensor
  const expanded_img = resized_img.expandDims(0);

  // chuẩn hóa các giá trị rgb thành -1-+1
  return expanded_img.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
}

export default function ScreenBottomCamera() {  
  const [isTfReady, setTfReady] = useState(false); 
  const [model, setModel] = useState(null); 
  const [image, setImage] = useState(null); 
  const [predictions, setPredictions] = useState(null); 
  const [error, setError] = useState(false); 

  useEffect(() => {
    (async () => {
      await tf.ready(); 
      setTfReady(true); 

      // khai báo và load model custom
      const model = require("./newModel/model.json");
      const weights = require("./newModel/weights.bin");
      const loadedModel = await tf.loadGraphModel(
        bundleResourceIO(model, weights)
      );

      setModel(loadedModel); 
      getPermissionAsync(); 
    })();
  }, []);

  async function handlerSelectImage() {
    try {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, // on Android user can rotate and crop the selected image; iOS users can only crop
        quality: 1, // Chất lượng ảnh cao nhất
        aspect: [4, 3], // duy trì tỷ lệ chuẩn
      });

      if (!response.cancelled) {
        const source = { uri: response.uri };
        setImage(source); 
        const imageTensor = await imageToTensor(source); 
        const predictions = await model.predict(imageTensor); // send the image to the model
        setPredictions(predictions); 
        //console.log(predictions)
      }
    } catch (error) {
      setError(error);
    }
  }

  function reset() {
    setPredictions(null);
    setImage(null);
    setError(false);
  }

  let status, statusMessage, showReset;
  const resetLink = (
      <Text onPress={reset} style={styles.reset}>
          Prediction finished.
      </Text>
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
      statusMessage = "Model is predicting...";
    } else {
      status = "modelLoad";
      statusMessage = "Model is loading...";
    }
  } else {
    statusMessage = "Unexpected error occured.";
    showReset = true;
    console.log(error);
  }

  return (
    <View style={styles.container}>
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
          <AwesomeButtonRick 
            type="secondary"
            width={250}
          >
            <Text>
              {statusMessage} {showReset ? resetLink : null}
            </Text>
          </AwesomeButtonRick>
        </Text>
      </View>
      <View style={styles.useCamera}>
        <Text style={styles.shadowIcon}>
          <Icon
            raised
            name='camera-retro'
            type='font-awesome'
            color='grey'
            size={24}           
            onPress={()=> alert(" Hế lô hê hê hê")}
            
          />
        </Text>        
      </View>
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
  shadowIcon:{
    shadowOpacity: 2,
    textShadowRadius: 3,
    textShadowOffset: { 
      width: 1, 
      height: 3 
    }
  },
  useCamera:{
    position: 'absolute',
    bottom: 0,
    right: 0,

  },
  innercontainer: {
    marginTop: -50,
    alignItems: "center",
    justifyContent: "center",
  },
  status: { 
    marginTop: 30,
  },
  reset: { 
    //color: "blue",
  },
  imageContainer: {
    width: 350,
    height: 300,
    borderRadius: 20,
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
    borderColor: "#495464",
    borderWidth: 4,
    borderStyle: "dotted",
  },
});
