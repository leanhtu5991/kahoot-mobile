import React, {Component} from 'react';
import {StyleSheet, View, Image, TextInput, Text, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import { ListItem, List, SearchBar} from 'react-native-elements';
import { API_URL_DEV } from 'react-native-dotenv'
import { withNavigation } from 'react-navigation';
import {Actions} from 'react-native-router-flux';
class Quizz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            quizzs: [],
            user :this.props.navigation.getParam('user')
        }
    }
    getAllQuizz =()=>{
        fetch('http://192.168.0.17:3000/api/getQuizz/'+this.state.user._id,{
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then(
            (responseJson) => {
            console.log(responseJson)
            this.setState({
                isLoading: false,
                quizzs : responseJson
                });
            }    
        )
    }
    viewDetail(item){
        this.props.navigation.navigate('detailQuizz', {
            quizz: item
          })
    }
    renderSeparator = ()=>{
        return(
            <View style={styles.separatorItem}>
            </View>
        )
    }
    renderItem = ({item}) =>{
        return (
            <ListItem
                roundAvatar
                title={item.question}
                onPress={() => this.viewDetail(item)}
            />
        )
    }
    componentWillReceiveProps(nextProps){
            this.getAllQuizz() 
      }
    componentDidMount(){
        this.getAllQuizz()
    }
    componentWillMount() {
        this.getAllQuizz()
    }
    openAddQuizz(){
        // Actions.addQuizzForm()
        this.props.navigation.navigate('addQuizzForm', {
            user: this.state.user
          })
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Gestion des quizzs</Text>  
                <TouchableOpacity onPress={() => this.openAddQuizz()} style={styles.btnOpenAddQuizz}>
                    <Text style={styles.btnOpenAddQuizzText}>Add Quizz</Text>
                </TouchableOpacity>
                    <FlatList
                        data= {this.state.quizzs}
                        renderItem = {this.renderItem}
                        keyExtractor = {item=>item.question}
                        ItemSeparatorComponent={this.renderSeparator}
                    /> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize : 24,
        marginTop: 30,
        marginLeft: 5
    },
    separatorItem : {
        height:1,
        width: '100%',
        backgroundColor: "#CED0CE",        
    },
    loading:{
        flex:1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnOpenAddQuizz:{
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        width : 100
    },
    btnOpenAddQuizzText:{
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    },
})

export default withNavigation(Quizz);