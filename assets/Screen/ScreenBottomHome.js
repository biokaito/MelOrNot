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
import { FlatList, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

const image = { uri: "https://images.pexels.com/photos/227417/pexels-photo-227417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" };

export default function ScreenBottomHome() {
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
                                    Hello Triều,
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
                <Button
                        title="GIGI"
                        onPress={()=>this.props.navigation.navigate("HomeScreen")}
                    >                        
                    </Button>
            </View>
        )
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f2",
    },
    flatlistImage:{
        width: 150,
        height: 250,
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
        width: 150,
        height: 250,
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