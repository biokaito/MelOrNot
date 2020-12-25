import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image } from 'react-native';
//import EStyleSheet from 'react-native-extended-stylesheet'
import { Feather, AntDesign } from '@expo/vector-icons';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Modal from 'react-native-modal';

export default function AccountScreen(props) {
  const listNote = [
    { title: 'Do homework', description: 'có làm thì mới có ăn cái loại không làn mà đòi có ăn thì chỉ có ăn cức ăn đầu buổi, NHÁ', category: 'work', priority: 'Fast', status: 'done', date: '20/10/2020' },
    { title: 'Do housework', description: 'cái loại không làn mà đòi có ăn thì chỉ có ăn cức ăn đầu buổi, NHÁ', category: 'work', priority: 'Fast', status: 'pending', date: '20/10/2020' },
    { title: 'Do love you', description: 'thì chỉ có ăn cức ăn đầu buổi, NHÁ', category: 'work', priority: 'Fast', status: 'Processing', date: '20/10/2020' },
    { title: 'Do love you', description: 'thì chỉ có ăn cức ăn đầu buổi, NHÁ', category: 'work', priority: 'Fast', status: 'Processing', date: '20/10/2020' },
    { title: 'Do love you', description: 'thì chỉ có ăn cức ăn đầu buổi, NHÁ', category: 'work', priority: 'Fast', status: 'Processing', date: '20/10/2020' },
  ]
  const [gallery,setGallery] = useState([]);

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MyGallery');
      if (value !== null) {
        // We have data!!
        //console.log(value);
        setGallery(JSON.parse(value))
      }
    } catch (error) {
      // Error retrieving data
      console.log(e)
    }
    console.log(gallery[0].melanoma)
  };
  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.wrapper1}>
        <View style={styles.header}>
          <TouchableOpacity onPress={_retrieveData}>
            <Text style={styles.headerText}>HISTORY</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.wrapper2}>
        <View>
          <TextInput
            placeholder="Search.."
            style={styles.searchBar}
            //value={this.state.search}
            //onChangeText={(text)=>this._search(text)}
          />
        </View>
        <ScrollView>
          <FlatList 
            data={gallery}
            renderItem={({item})=>{
              return(
                <View style={styles.wrapper}>
                  <View style={styles.headerComponent}>
                    <View style={styles.titleStyle}>
                      <Text style={styles.titleText}>{item.akiec}</Text>
                    </View>
                    <View style={styles.categoryStyle}>
                      <Text style={styles.categoryText}>{item.bcc}</Text>
                    </View>
                  </View>
                  <View style={styles.middleComponent}>
                    <View style={styles.desStyle}>
                      <ScrollView
                        style={styles.desScrollView}
                      >
                        <Image source={{uri: item.source}} style={{height: 50,width:50}} />
                      </ScrollView>
                    </View>
                    <View style={styles.dateStyle}>
                      <Text style={styles.dateText}>{item.df}</Text>
                    </View>
                  </View>
                  <View style={styles.crossbar}>

                  </View>
                  <View style={styles.bottomComponent}>
                    <View  style={styles.priStyle}>
                      <Text style={styles.categoryText}>{item.melanoma}</Text>
                    </View>
                    <View  style={styles.sttStyle}>
                      <Text style={styles.categoryText}>{item.nv}</Text>
                    </View>
                  </View>
                </View>
              )
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    marginTop: 0,
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
    fontSize: 10,
    fontFamily: 'Futura',
    fontStyle: 'italic'
  },
  dateText:{
    fontSize: 14,
    fontWeight: 'bold'
  },
  headerComponent:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  desScrollView:{
    width: 50,
    height: 50,
    borderLeftWidth: 1,
    borderLeftColor: 'gray',
  },
  bottomComponent:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3
  },
  desText:{
    marginLeft: 3
  },
  middleComponent:{
    flexDirection: 'row',
    justifyContent: 'space-between',    
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
    marginBottom: 7
  },
  crossbar:{
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: 120,
    marginLeft: '17%'
  },
  titleText:{
    fontSize: 12,
    fontFamily: 'Arial'
  },
  wrapper:{
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 38,
    shadowOffset: {
      width: 0,
      height: 2
    },
    padding: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
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
});