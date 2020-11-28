import React from "react";
import{
View,
Text,
StyleSheet,
ScrollView,
ImageBackground,
Image,
Animated
} from "react-native";

const image = { uri: "https://images.pexels.com/photos/227417/pexels-photo-227417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" };

export default class Home extends React.Component{
    render(){
        const definitions = this.props.navigation.getParam('definitions');        
        const LineDivider = () => {
            return (
                <View style={{ width: 1, paddingVertical: 5 }}>
                    <View style={{ flex: 1, borderLeftColor: "#EFEFF0", borderLeftWidth: 1 }}></View>
                </View>
            )
        }        
        return (
            <View style={styles.container}>
               <View style={{flex: 4}}>
                    <ImageBackground
                        source={definitions.sampleImage}
                        resizeMode="cover"
                        style={styles.imageBackground}
                    >
                    </ImageBackground>
                    <View style={styles.imageCover}>
                        <Image 
                            source={definitions.sampleImage}
                            resizeMode="contain"
                            style={styles.avtImage} 
                        />
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.titleStyle}>{definitions.title}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        paddingVertical: 20,
                        margin: 24,
                        borderRadius: 12,
                        backgroundColor: "rgba(0,0,0,0.3)"
                    }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontFamily: "Roboto-Bold", fontSize: 16, color: 'white' }}>14</Text>
                            <Text style={{ fontFamily: "Roboto-Regular", fontSize: 14, color: 'white' }}>Rating</Text>
                        </View>
                        <LineDivider />
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontFamily: "Roboto-Bold", fontSize: 16, color: 'white' }}>14</Text>
                            <Text style={{ fontFamily: "Roboto-Regular", fontSize: 14, color: 'white' }}>Rating</Text>
                        </View>
                        <LineDivider />
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontFamily: "Roboto-Bold", fontSize: 16, color: 'white' }}>14</Text>
                            <Text style={{ fontFamily: "Roboto-Regular", fontSize: 14, color: 'white' }}>Rating</Text>
                        </View>
                    </View>
               </View>
               <View style={{ flex: 2 }}>  
                    <View style={{ flex: 1, flexDirection: 'row', padding: 24 }}>
                        
                        <View style={{ width: 4, height: "100%", backgroundColor: 'gray' }}>
                            
                        </View>

                        
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{ marginLeft: 4,fontFamily: "Roboto-Bold", fontSize: 22, color: "#FFFFFF", marginBottom: 24 }}>Description</Text>
                        </View>
                        <ScrollView
                            contentContainerStyle={{ paddingLeft: 36 }}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                        >                           
                            <Text style={{ fontFamily: "Roboto-Regular", fontSize: 20, color: "#64676D" }}>{definitions.content}</Text>
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1B26'
    },
    titleStyle:{
        fontFamily: "Roboto-Bold",
        fontSize: 22,
        lineHeight: 30,
        fontWeight: 'bold'
    },
    title:{
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avtImage:{
        flex: 1,
        height: '70%',
        width: '70%'
    },
    imageBackground:{
        position: 'absolute',
        top:0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0.6
    },
    imageCover:{
        flex: 5,
        alignItems: 'center'
    },
})