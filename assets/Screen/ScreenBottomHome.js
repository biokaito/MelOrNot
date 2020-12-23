import React, { useState, useEffect } from "react";
import{
View,
Text,
StyleSheet,
ImageBackground,
TextInput,
Image,
Button
} from "react-native";
import { Icon } from 'react-native-elements';
import { FlatList, ScrollView, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from '@expo/vector-icons/AntDesign'

const image = { uri: "https://images.pexels.com/photos/227417/pexels-photo-227417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" };

const ScreenBottomHome = ({navigation}) => {
    const [gallery,setgallery] = useState([
        {
            image : require("../src/images/1.png"),
            title : 'Excited',
            id : '1'
        },
        {
            image : require("../src/images/2.png"),
            title : 'Tired',
            id : '2'
        },
        {
            image : require("../src/images/3.png"),
            title : 'Stressfull',
            id : '3'
        },
        {
            image : require("../src/images/4.png"),
            title : 'Pretty Good',
            id : '4'
        },
        {
            image : require("../src/images/5.png"),
            title : 'Sick',
            id : '5'
        },

    ])
        return (
            <View>
                <View>
                    <ImageBackground
                        source={image}
                        style={{width: '100%',height: 250}}
                        imageStyle={{borderBottomRightRadius:150}}
                    >
                        <View style={styles.darkOverlay}>
                            <View style={styles.headerText}>
                                <Text style={styles.userGreet}>
                                    Hello,
                                </Text>
                                <Text style={styles.userText}>
                                    How do you doing today?
                                </Text>
                            </View>
                            <View>
                                <TextInput
                                    style={styles.inputBox}
                                    placeholder= "Let me know"
                                    placeholderTextColor='#666'
                                >
                                    
                                </TextInput>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <ScrollView style={styles.bodyContainer}>
                    <View>
                        <FlatList
                            horizontal={true}
                            data={gallery}
                            renderItem={({item}) => {
                                return(
                                    <View style={styles.flatlistImageWrapper}>
                                        <TouchableOpacity>
                                            <Image 
                                            source={item.image}
                                            style={styles.flatlistImage}
                                            />
                                            <View style={styles.imageOverlay}></View>                                        
                                            <Text style={styles.flatlistTitle}>
                                                {<Icon
                                                    name='podcast'
                                                    type='font-awesome'
                                                    color='white'
                                                    size={16}           
                                                />}{" "}
                                            {item.title}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                        >                    
                        </FlatList>
                        </View>
                        <View>
                            <Text style={styles.titleQuestion}>Learn</Text>
                            <TouchableOpacity onPress={()=>navigation.navigate("Why")}>
                                <View style={styles.questionContainer}>
                                    <Text style={styles.questionText}>Why should you keep an eye on your skin?</Text>
                                    <AntDesign name="right" size={20}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>navigation.navigate("Can")}>
                                <View style={styles.questionContainer}>
                                    <Text style={styles.questionText}>Can a smartphone app diagnose melanoma skin cancer?</Text>
                                    <AntDesign name="right" size={20}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>navigation.navigate("How")}>
                                <View style={styles.questionContainer}>
                                    <Text style={styles.questionText}>How is melanoma skin cancer diagnosed?</Text>
                                    <AntDesign name="right" size={20}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>navigation.navigate("What")}>
                                <View style={styles.questionContainer}>
                                    <Text style={styles.questionText}>What skin cancer risk factors should you be aware of?</Text>
                                    <AntDesign name="right" size={20}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>navigation.navigate("Regularly")}>
                                <View style={styles.questionContainer}>
                                    <Text style={styles.questionText}>How often should you keep an eye on your skin?</Text>
                                    <AntDesign name="right" size={20}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    {/*<Button
                        title="GIGI"
                        onPress={()=>navigation.navigate("HomeScreen")}
                    >                        
                    </Button>*/}
                </ScrollView>
            </View>
        )
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f2",
    },
    titleQuestion:{
        color: 'black',
        fontSize: 20,
        marginLeft: 20,
        fontWeight: 'bold'
    },
    questionContainer:{
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        padding: 20,
        alignItems: 'center',
    },
    questionText:{
        color:'gray',
    },
    bodyContainer:{
        height: 390,
    },
    flatlistImage:{
        width: 130,
        height: 200,
        marginRight: 0,
        borderRadius: 20
    },
    flatlistTitle:{
        position: 'absolute',
        color: 'white',
        marginTop: 4,
        fontSize: 14,
        left: 10,
        bottom: 10
    },
    imageOverlay:{
        width: 130,
        height: 200,
        marginRight: 6,
        position: 'absolute',
        backgroundColor: '#000',
        opacity: 0.4,
        borderRadius: 20
    },
    flatlistImageWrapper:{
        paddingVertical: 15,
        paddingLeft: 16,
    },
    inputBox:{
        marginTop: 20,
        backgroundColor: '#fff',
        paddingLeft: 24,
        padding: 12,
        borderBottomRightRadius: 40,
        borderTopRightRadius: 40,
        width: "90%",
    },
    headerText:{
        paddingTop: 70,
        paddingLeft: 10
    },
    darkOverlay:{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: 250,
        backgroundColor: "#000",
        opacity: 0.4,
        borderBottomRightRadius: 150,
    },
    userGreet:{
        fontSize: 38,
        fontWeight: 'bold',
        color: 'white'
    },
    userText:{
        fontSize: 16,
        fontWeight: 'normal',
        color: 'white'
    }
})
export default ScreenBottomHome;