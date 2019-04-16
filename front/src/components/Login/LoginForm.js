import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Button, AsyncStorage} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import User from '../User/User';
import Authentication from '../../Services/Authentication';
import { API_URL_DEV } from 'react-native-dotenv'
class LoginForm extends React.Component {
    constructor(props){
        super(props);
        authentication = new Authentication();
        this.state = {
            isLoading: true,
            user:{
                email: "",
                password : ""
            },
            token: ""
        }
    }

    submit=()=>{
        fetch(API_URL_DEV+'/api/login',{
            method: "POST",
            body: JSON.stringify(this.state.user),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((res) => {
            this.setState({
                isLoading: false,
                token: res
                });
            console.log(res)
            authentication.saveToken(res.token)
        })
    }
    updateValue(text, field){
        if(field=='email'){
            this.state.user.email = text
        } else if(field == 'password'){
            this.state.user.password = text
        }
    }
    componentDidMount(){
      }
    render(){
        return(
            <View style={styles.container}>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    onChangeText={(text)=>this.updateValue(text, 'email')}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(text)=>this.updateValue(text, 'password')}
                />
                <TouchableOpacity onPress={this.submit} style={styles.buttonLoginContainer}>
                    <Text style={styles.buttonLoginText}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        padding:20
    },
    input:{
        height:40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom:20,
        color:"#FFF",
        paddingHorizontal:10
    },
    buttonLoginContainer:{
        backgroundColor: '#2980b9',
        paddingVertical: 10
    },
    buttonLoginText:{
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    }
})
// loginForm = new LoginForm()
export default LoginForm
