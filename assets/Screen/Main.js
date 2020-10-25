import React from "react";
import{
View,
Text,
StyleSheet
} from "react-native";

export default class Main extends React.Component{
    render(){
        return (
            <View>
                <Text>Main</Text>
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