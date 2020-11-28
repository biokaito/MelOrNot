import React from 'react'
import { View, StyleSheet, Text, Button, SafeAreaView } from 'react-native'


const ScreenA = ({ navigation }) => {

    function navigationToNextScreenWithSomeData(){
        navigation.navigate('screenB', {
            itemID: 10,
            otherParams: 'any thing'
        })
    }

    return (
        <SafeAreaView>
        <View>
            <Text>Screen A</Text>
            <Button title= "Navigate To Screen B"
            onPress = {navigationToNextScreenWithSomeData}  ></Button>
            {/* <Button title = "Open My modal" onPress = {() => {navigation.navigate('MyModal')}}></Button> */}


        </View>
        </SafeAreaView>
    )
}

export default ScreenA