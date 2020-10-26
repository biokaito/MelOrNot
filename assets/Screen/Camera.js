import React from "react";
import{
View,
Text,
StyleSheet,
} from "react-native";

export default class Camera extends React.Component{
    render(){
        return (
            <View>
                <Text>Camera</Text>
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