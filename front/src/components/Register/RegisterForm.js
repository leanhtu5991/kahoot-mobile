import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import User from '../User/User';
import { API_URL_DEV } from 'react-native-dotenv'
class RegisterForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            user:{
                name: "",
                email: "",
                password : ""
            }
        }
    }
   
    submitRegister=()=>{
        console.log(this.state.user)
        fetch(API_URL_DEV+'/api/register',{
            method: "POST",
            body: JSON.stringify(this.state.user),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((res) => {
            this.setState({
                isLoading: false
            })
            console.log(res)
        })
    }
    updateValue(text, field){
        if(field=='email'){
            this.state.user.email = text
        } else if(field == 'password'){
            this.state.user.password = text
        } else if(field == 'name'){
            this.state.user.name = text
        }
    }
    componentDidMount(){
        console.log('register',this.props)
      }
    render(){
        return(
            <View style={styles.container}>
                <TextInput
                    placeholder="Name"
                    style={styles.input}
                    onChangeText={(text)=>this.updateValue(text, 'name')}
                />
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
                <TouchableOpacity onPress={this.submitRegister} style={styles.buttonLoginContainer}>
                    <Text style={styles.buttonLoginText}>Register</Text>
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
export default RegisterForm