import React from "react";
import{
View,
Text,
StyleSheet,
Image
} from "react-native";
import updatingImage from '../src/images/updating.png'

export default class ScreenBottomUser extends React.Component{
    render(){
        return (
            <View style={styles.cummingContent}>
                <Text style={styles.textCumming}>We are developinggg</Text>
                <Text style={styles.textCumming}>Comming soon !!</Text>
                <Image source={updatingImage} style={styles.cummingImage} ></Image>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    cummingContent:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white'
    },
    textCumming:{
        textAlign: "center",
        fontSize: 20,
        fontStyle: "italic",
        fontWeight: "300",
    },
    cummingImage:{
        resizeMode : "contain",
        height : '50%',
        
    }

})