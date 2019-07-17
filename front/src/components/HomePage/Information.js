import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Button, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Information extends React.Component {
    constructor(props) {
        super(props),
        this.state = {
            user :this.props.navigation.getParam('user'),
            isLoading: true,
            token: ""
        }
    }
    componentDidMount= async () =>{
        console.log(this.state.user)
    }
    render(){
        return(
            <View>
                <Text>Information</Text>  
            </View>
        );
    }
}
export default Information