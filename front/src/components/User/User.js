import React, {Component} from 'react';
import {StyleSheet, View, Image, TextInput, Text, FlatList, ActivityIndicator} from 'react-native';
import { ListItem, List, SearchBar} from 'react-native-elements';
import { API_URL_DEV } from 'react-native-dotenv'

// import DetailUser from './DetailUser';
class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            users: []
        }
    }
    
    getAllUsers =()=>{
        fetch('http://192.168.0.17:3000/api/users',{
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then(
            (responseJson) => {
            // console.log(responseJson)
            this.setState({
                isLoading: false,
                users : responseJson
                });
            }
        )
    }
    viewDetail(item){
        this.props.navigation.navigate('detailUser', {
            user: item
          })
    }
    renderItem = ({item}) =>{
        return (
            <ListItem
                roundAvatar
                title={item.name}
                subtitle={item.email}
                onPress={() => this.viewDetail(item)}
            />
        )
    }
    renderSeparator = ()=>{
        return(
            <View style={styles.separatorItem}>
            </View>
        )
    }
    renderHeader = ()=> {
        return (
            <SearchBar        
                placeholder="Type Here..."        
                lightTheme        
          />    
       )
     }
    componentDidMount(){
        this.getAllUsers()
        console.log(this.state.users)
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Gestion des joueurs</Text>  
                    <FlatList
                        data= {this.state.users}
                        renderItem = {this.renderItem}
                        keyExtractor = {item=>item.email}
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
    }
})

export default User;