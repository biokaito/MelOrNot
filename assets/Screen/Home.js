import React from "react";
import{
View,
Text,
StyleSheet,
} from "react-native";

export default class Home extends React.Component{
    render(){
        return (
            <View>
                <Text>Home</Text>
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