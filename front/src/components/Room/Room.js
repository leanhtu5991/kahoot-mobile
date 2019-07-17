import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Button, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Room extends React.Component {
    constructor(props) {
        super(props),
        this.state = {
            user :this.props.navigation.getParam('user'),
            isLoading: true,
            token: ""
        }
        this.play = this.play.bind(this)
    }
    componentDidMount= async () =>{
        console.log(this.state.user)
    }
    play(){
        this.props.navigation.navigate('play',{
            user : this.state.user
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.play} style={styles.btnPlayNavigate}>
                    <Text style={styles.btnText}>Start</Text>
                </TouchableOpacity>
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
    btnPlayNavigate:{
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        padding: 10,
        width:200,
        height:100,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText:{
        color: '#FFF',
        fontWeight: '700',
        fontSize: 25
    }
})
export default Room