import React from "react";
import{
View,
Text,
StyleSheet,
ActivityIndicator,
FlatList,
Dimensions,
Image,
TouchableWithoutFeedback,
Linking,
Share
} from "react-native";

const{width,height} = Dimensions.get('window');
console.disableYellowBox = true;

export default class ScreenBottomIntro extends React.Component{
    constructor(props){
        super(props);
        {
            this.state={
                news : [],
                loading : true,
            }
        }
    }
    componentDidMount(){
        return fetch('https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=9a26f28d690644669fb65345aef49a62')
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
                news : responseJson.articles,
                loading : false
            })
        })
        .catch((err) => {
            console.error(err);
        });
    }
    sharearticle = async (article) => {
        try{
            await Share.share({
                message: 'Checkout this article : ' +article
            })
        }catch (err){
            console.log(err)
        }
    }
    renderItem_ = ({item}) => {
        return(
           <TouchableWithoutFeedback onPress={() =>Linking.openURL(item.url)}>
                <View style={styles.renderitem}>
                    <Image source={{uri : item.urlToImage }} style={[StyleSheet.absoluteFill,{borderRadius:30}]} />
                    <View style={styles.gradient}>
                    <Text style={styles.titleArticle}>{item.title}</Text>
                    <Text style={styles.shareArticle} onPress={() => {
                        this.sharearticle(item.url)
                    }} >Share</Text>
                    </View>
                </View>
           </TouchableWithoutFeedback>
        )
    }

    render(){
        return (
            this.state.loading ? 
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="white" />
            </View>
             : 
             <View style={styles.container}>
                <View style={styles.header}>
                    <Text 
                        style={styles.headerText}
                        onPress={()=>this.props.navigation.navigate("HomeScreen")}
                    >
                        Hello, Triều !
                    </Text>
                    <Text style={styles.headerText}>
                        How do u doing today ?
                    </Text>
                </View>
                <View style={styles.news}>
                    <FlatList
                        data={this.state.news}
                        renderItem={this.renderItem_}
                    />
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f2",
    },
    shareArticle:{
        fontSize: 14,
        color: '#FFFFFF',
        position: 'absolute',
        top : 0,
        right : 0,
        padding : 10,
        fontStyle: 'italic'
    },
    titleArticle:{
        position : 'absolute',
        bottom: 0,
        color: '#FFFFFF',
        fontSize: 18,
        padding: 5
    },
    header:{
        padding:15,

    },
    headerText:{
        fontSize:25,
        color: "#FFF",
        fontStyle: 'italic'
    },
    loading:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333'
    },
    renderitem:{
        width: width-50,
        height: 200,
        backgroundColor: '#ffffff',
        marginBottom: 15,
        borderRadius: 30,
    },
    news:{
        alignSelf: 'center',
        marginBottom: 90
    },
    gradient:{
        width: '100%',
        height : '100%',
        borderRadius: 30,
        backgroundColor: 'rgba(0,0,0,0.5)'

    }
})