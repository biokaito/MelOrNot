import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image } from 'react-native';
//import EStyleSheet from 'react-native-extended-stylesheet'
import { Feather, AntDesign } from '@expo/vector-icons';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native';

const image = { uri: "https://images.pexels.com/photos/227417/pexels-photo-227417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" };

export default class Repo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            gallery: [],
            filterGallery: [],
            searchInput: '',
        };
      }
      async setCart(cart) {
        try {
          await AsyncStorage.setItem('@Mygallery', JSON.stringify(cart));
    
          this.setState({
            gallery: cart
          });
    
        } catch (e) {
          alert('Có lỗi xảy ra!')
        }
      }
      async getCart() {
        try {
          let cart = await AsyncStorage.getItem('@Mygallery');
    
          if (cart != null) {
            this.setState({
                gallery: JSON.parse(cart)
            });
          }
    
        } catch (e) {
          // read error
          alert('Có lỗi xảy ra!')
        }
      }
      addItemCart(product) {     
        let products = this.state.gallery;
        products.push(product);
        this.setCart(products);
        // console.log(this.state.cart.products)
    
      }
      removeItemCart(product) {
        let products = this.state.gallery;
        let idx = this.search(product, products);        
        // Remove single item
        products.splice(idx, 1);
        // Update the state
        this.setCart(products);
        console.log('hihi')
      }
      search(product, products) {
        for (var i = 0; i < products.length; i++) {
          if (products[i].id === product.id) {
            return i;
          }
        }
        return -1;
      }
      componentDidMount(){
        this.getCart().then(() => {
            let product = this.props.navigation.getParam('gallery')
            if (product != null) {
                this.addItemCart(product);
              }
        })        
      }
    render(){
        return (
            <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.wrapper1}>
                <View style={styles.header}>
                <View>
                    <Text style={styles.headerText}>HISTORY</Text>
                </View>
                </View>
            </View>
            <View style={styles.wrapper2}>
                <View>
                <TextInput
                    placeholder="Search by.."
                    style={styles.searchBar}
                    //value={searchInput}
                    //onChangeText={(text)=>_search(text)}
                />
                </View>
                <ScrollView>
                <FlatList 
                    data={this.state.gallery}
                    renderItem={({item,index})=>{
                    return(
                        <TouchableOpacity style={styles.wrapper} onPress={() => {this.removeItemCart(item)}} >
                        <View style={styles.headerComponent}>
                            <TouchableOpacity>
                            <View>
                                <AntDesign name="closesquare" size={19} />
                            </View>
                            </TouchableOpacity>
                            <View>
                            <Text style={styles.categoryText}>{item.time}</Text>
                            </View>                    
                        </View>

                        <View style={styles.middleComponent}>
                            <View style={styles.imageView}>
                                <Image source={{uri: item.source}} style={styles.imageSave} />
                            </View>
                            <View style={styles.scrollViewInside}>
                            <View style={styles.headerInside}>                        
                                <View>
                                <ImageBackground
                                    source={require('../src/images/circle.png')}
                                    style={styles.imageBackground}
                                >
                                    <Text style={styles.textNumberType}>{item.akiec}</Text>
                                </ImageBackground>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={styles.textNameType}>akiec</Text>
                                </View>
                                </View>
                                <View>
                                <ImageBackground
                                    source={require('../src/images/circle.png')}
                                    style={styles.imageBackground}
                                >
                                    <Text style={styles.textNumberType}>{item.melanoma}</Text>
                                </ImageBackground>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={styles.textNameType}>mel</Text>
                                </View>
                                </View>
                                <View>
                                <ImageBackground
                                    source={require('../src/images/circle.png')}
                                    style={styles.imageBackground}
                                >
                                    <Text style={styles.textNumberType}>{item.vasc}</Text>
                                </ImageBackground>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={styles.textNameType}>vasc</Text>
                                </View>
                                </View>
                            </View>
                            <View style={styles.footerInside}>
                                <View>
                                    <ImageBackground
                                    source={require('../src/images/circle.png')}
                                    style={styles.imageBackgroundfooter}
                                    >
                                    <Text style={styles.textNumberType}>{item.bcc}</Text>
                                    </ImageBackground>
                                    <View style={{alignItems: 'center'}}>
                                    <Text style={styles.textNameTypefooter}>bcc</Text>
                                    </View>
                                </View>
                                <View>
                                    <ImageBackground
                                    source={require('../src/images/circle.png')}
                                    style={styles.imageBackgroundfooter}
                                    >
                                    <Text style={styles.textNumberType}>{item.bkl}</Text>
                                    </ImageBackground>
                                    <View style={{alignItems: 'center'}}>
                                    <Text style={styles.textNameTypefooter}>bkl</Text>
                                    </View>
                                </View>
                                <View>
                                    <ImageBackground
                                    source={require('../src/images/circle.png')}
                                    style={styles.imageBackgroundfooter}
                                    >
                                    <Text style={styles.textNumberType}>{item.df}</Text>
                                    </ImageBackground>
                                    <View style={{alignItems: 'center'}}>
                                    <Text style={styles.textNameTypefooter}>df</Text>
                                    </View>
                                </View>
                                <View>
                                    <ImageBackground
                                    source={require('../src/images/circle.png')}
                                    style={styles.imageBackgroundfooter}
                                    >
                                    <Text style={styles.textNumberType}>{item.nv}</Text>
                                    </ImageBackground>
                                    <View style={{alignItems: 'center'}}>
                                    <Text style={styles.textNameTypefooter}>nv</Text>
                                    </View>
                                </View>
                            </View>
                            </View>
                            <View style={styles.dateStyle}>
                            <Text style={styles.dateText}>{item.date}</Text>
                            </View>
                        </View>

                        <View style={styles.crossbar} />

                        <View style={styles.bottomComponent}>
                            
                        </View>
                        </TouchableOpacity>
                    )
                    }}
                />
                </ScrollView>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EEEEEE',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header:{
      flexDirection: 'row'
    },
    headerText:{
      fontSize: 25,
      fontWeight: 'bold',
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: {
        width: 0, 
        height: 4
      },
      textShadowRadius: 10
    },
    categoryText:{
      fontSize: 15,
      fontFamily: 'Futura',
      fontStyle: 'italic'
    },
    dateText:{
      fontSize: 20,
      fontWeight: 'bold'
    },
    headerComponent:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      //backgroundColor: 'red'
    },
    imageView:{
  
    },
    headerInside:{
      flex: 1,
      //backgroundColor: 'purple',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    footerInside:{
      flex: 1,
      //backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    scrollViewInside:{
      //backgroundColor: 'white',
      height: '100%',
      width:150,
    },
    imageSave:{
      height: 60,
      width: 60,
      borderRadius: 10
    },
    bottomComponent:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 3,
      //backgroundColor: 'blue'
    },
    middleComponent:{
      flexDirection: 'row',
      justifyContent: 'space-between',    
      alignItems: 'center',
      marginBottom: 7,
      height: 100,
      //backgroundColor: 'green',
      flex: 6,
    },
    crossbar:{
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      width: 230,
      marginLeft: '17%'
    },
    wrapper:{
      width: '100%',
      height: 160,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 10,
      marginBottom: 10,
      borderLeftWidth: 10,
      borderLeftColor: '#03506f'
    },
    wrapper1:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#03506f',
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      width: '100%',
      padding: 5,
      shadowColor: 'black',
      shadowOpacity: 1,
      shadowRadius: 12,
      shadowOffset: {
        width: 4,
        height: -4
      },
    },
    wrapper2:{
      flex: 10,
      width: '100%',
      padding: 5,
    },
    searchBar:{
      marginLeft: 5,
      backgroundColor: '#bbbbbb',
      padding: 10,
      borderRadius: 50,
      marginTop: 5,
      marginBottom: 10
    },
    iconReload:{
      position: 'absolute',
      top: 0,
      right: -90,
    },
    textNumberType:{
      fontSize: 10,
    },
    imageBackground:{
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
      marginRight: 10,
    },
    imageBackgroundfooter:{
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 5
    },
    textNameType:{
      fontSize: 11,
      marginLeft: 10,
      marginRight: 10,
    },
    textNameTypefooter:{
      fontSize: 11,
      marginHorizontal: 5
    }
  });