import React from "react";
import{
View,
Text,
StyleSheet,
} from "react-native";

export default class Intro extends React.Component{
    render(){
        return (
            <View>
                <Text>Cảm ơn</Text>
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