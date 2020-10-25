import React from "react";
import{
View,
Text,
StyleSheet,
Button,
} from "react-native";

export default class ScreenBottomHome extends React.Component{
    render(navigation){
        return (
            <View>
                <Text>Nguyễn Bá Tiều</Text>
                <Button title = "Navigate to Screen A" onPress={()=>this.props.navigation.navigate("HomeScreen")}>

                </Button>
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