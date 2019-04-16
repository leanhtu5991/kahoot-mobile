import React, {Component} from 'react';
import {StyleSheet, View, Image, TextInput, Button, Text} from 'react-native';
import LoginForm from './LoginForm';
import {Actions} from 'react-native-router-flux';
class Login extends React.Component {
    constructor(props) {
        super(props)
        }

    register() {
		Actions.register()
    }
    user() {
		Actions.user()
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logoImage} source={require('../../images/kahoot-logo.png')}/>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm/>
                </View>
                <View>
                    <Text><Text  style={styles.linkRegister}>Create account for free. </Text><Text onPress={this.register}>Sign up</Text></Text>
                </View>
                <View>
                    <Text onPress={this.user}>User</Text>
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
        width: 300
    },
    linkRegister:{
        color: "#fff"
    }
})

export default Login;