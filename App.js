import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons';

import HomeScreen from './assets/Screen/Home';
import IntroScreen from './assets/Screen/Intro';
import MainScreen from './assets/Screen/Main';
import CameraScreen from './assets/Screen/Camera'
import DifinitionScreen from './assets/Screen/Difinitionsdetails'

import BottomTabHome from './assets/Screen/ScreenBottomHome';
import BottomTabNews from './assets/Screen/ScreenBottomNews';
import BottomTabCamera from './assets/Screen/ScreenBottomCamera';
import BottomTabChat from './assets/Screen/ScreenBottomChat';
import BottomTabUser from './assets/Screen/ScreenBottomUser';

const tabNavigator = createBottomTabNavigator({
  Home: createStackNavigator({
    Home: BottomTabHome,
    HomeScreen: HomeScreen
  }),
  News: createStackNavigator({
    News: BottomTabNews,
  }),
  Camera: createStackNavigator({
    Camera: BottomTabCamera,
    HomeScreen: HomeScreen
  }),
  Chat: createStackNavigator({
    Chat: BottomTabChat,
  }),
  User: createStackNavigator({
    User: BottomTabUser,
  }),
},
{
  defaultNavigationOptions: ({navigation})=>({
  tabBarIcon: ({focused, horizontal, tintColor})=>{
    const{routeName} = navigation.state
    let IconComponent = Ionicons
    let iconName 
    if(routeName === 'Home'){
      iconName = focused ? 'ios-home' : 'md-home'
    }else if(routeName === 'News'){
      iconName = focused? 'ios-tv' : 'md-tv'
    }else if(routeName === 'Camera'){
      iconName = focused? 'ios-camera' : 'md-camera'
    }else if(routeName === 'Chat'){
      iconName = focused? 'ios-chatboxes' : 'ios-chatbubbles'
    }else if(routeName === 'User'){
      iconName = focused? 'ios-body' : 'md-body'
    }
    if(focused)
      {
        return <IconComponent name = {iconName} size ={30} color = {tintColor} ></IconComponent>
      }
      else{
        return <IconComponent name = {iconName} size ={25} color = {tintColor} ></IconComponent>
      }
  }
}
)},

  {
    tabBarOptions:{
    activeTintColor: '#fff',
    activeBackgroundColor: '#f4511e',
    keyboardHidesTabBar: false,
    tabStyle:{
      backgroundColor: '#f4511e'
    },
    labelStyle:{
      fontSize: 12,
    }
  }
}
)

const App = createAppContainer(tabNavigator)
export default App;
