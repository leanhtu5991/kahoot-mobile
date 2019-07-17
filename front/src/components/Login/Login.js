import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Button, AsyncStorage} from 'react-native';

import {Actions} from 'react-native-router-flux';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Authentication from '../../Services/Authentication';
import { API_URL_DEV } from 'react-native-dotenv'
class Login extends React.Component {
    constructor(props) {
        super(props);
        authentication = new Authentication();
        this.state = {
            isLoading: true,
            user:{
                email: "",
                password : ""
            },
            token: "",
            message: ""
        };
        this.saveToken = this.saveToken.bind(this)
        this.getToken = this.getToken.bind(this)
        this.quizz = this.quizz.bind(this)
    }
    // save token
    saveToken = async (token) => {
        try {
        await AsyncStorage.setItem('token', token);
        } catch (error) {
        }
    };
    //get token
    getToken= async () => {
        try {
            let token = await AsyncStorage.getItem('token');
            return token
        } catch (error) {
            console.log("error while getting token");
            return 'error'
        }
    }
    //logout remove token
    logout = async () => {
        await AsyncStorage.clear();
        console.log(AsyncStorage)
    };
    isAdmin(){
        // return decode(this.getToken());
    }

    register() {
		Actions.register()
    }
    user() {
		Actions.user()
    }
    quizz(){
        this.props.navigation.navigate('quizz', {
            user: this.state.user
        })
    }
    updateValue(text, field){
        if(field=='email'){
            this.state.user.email = text
        } else if(field == 'password'){
            this.state.user.password = text
        }
    }
    submitLogin(){
        if(this.state.user.email != "" && this.state.user.password != ""){
            fetch('http://192.168.0.17:3000/api/login',{
                method: "POST",
                body: JSON.stringify(this.state.user),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then((response) => response.json())
            .then((res) => {
                if(res.status == "success"){
                    this.setState({
                        isLoading: false,
                        token: res.token,
                        message: res.message
                        });
                    this.saveToken(res.token);
                    if(res.user.isAdmin){
                        this.props.navigation.navigate('admin')
                    } else {
                        this.props.navigation.navigate('player')
                    }
                } else {
                    this.setState({
                        message: res.message
                    })
                }
            })
        } else {
            this.setState({
                message: "Remplir form"
            })
        }
    }
    componentDidMount(){

    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logoImage} source={require('../../images/kahoot-logo.png')}/>
                </View>
                <View style={styles.formContainer}>
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
                    <TouchableOpacity onPress={() => this.submitLogin()} style={styles.buttonLoginContainer}>
                        <Text style={styles.buttonLoginText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text><Text  style={styles.linkRegister}>Create account for free. </Text><Text onPress={this.register}>Sign up</Text></Text>
                </View>
                <View>
                    <Text style={styles.message}>{this.state.message}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#3498db',
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    logoImage:{
        width:140,
        height:50
    },
    formContainer:{
        width: 300,
        marginTop:20,
        marginBottom: 20
    },
    linkRegister:{
        color: "#fff"
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
    },
    message:{
        color: "#FFF",
        fontWeight: '700'
    }
})

export default Login;