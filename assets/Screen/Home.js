import React from "react";
import{
View,
Text,
StyleSheet,
ScrollView,
ImageBackground
} from "react-native";

const image = { uri: "https://images.pexels.com/photos/227417/pexels-photo-227417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" };

export default class Home extends React.Component{
    render(){
        return (
            <View>
                <ImageBackground
                    source={image}
                    style={{width: '100%',height: 270}}
                    imageStyle={{borderBottomRightRadius:65}}
                >

                </ImageBackground>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})