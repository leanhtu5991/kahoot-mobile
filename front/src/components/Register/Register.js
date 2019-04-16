import React, {Component} from 'react';
import {StyleSheet, View, Image, TextInput, Button, Text} from 'react-native';
import RegisterForm from './RegisterForm';
import {Actions} from 'react-native-router-flux';
class Register extends React.Component {
    login() {
		Actions.login()
	}
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text>Sign up for free</Text>
                </View>
                <View style={styles.formContainer}>
                    <RegisterForm/>
                </View>
                <View>
                    <Text onPress={this.login}>
                        Back to Sign in
                    </Text>
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
    }
})

export default Register;