import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Button, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Authentication from '../../Services/Authentication';
import { API_URL_DEV } from 'react-native-dotenv'
class Admin extends React.Component {
    constructor(props) {
        super(props),
        authentication = new Authentication()
        this.state = {
            user: null,
            isLoading: true,
            token: ""
        }
        this.viewInformation = this.viewInformation.bind(this)
        this.quizz = this.quizz.bind(this)
        this.room = this.room.bind(this)
        // this.getProfile = this.getProfile.bind(this)
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
    viewInformation(){
        this.props.navigation.navigate('information', {
            user: this.state.user
        })
    }
    room(){
        this.props.navigation.navigate('room',{
            user : this.state.user
        })
    }
    componentDidMount= async () =>{
        AsyncStorage.getItem('token').then((token) => {
            this.setState({
              isLoading: false,
              token : token,
            });
            fetch('http://192.168.0.17:3000/api/profile',{
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                })
            })
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                   user: res
                  });
                console.log(this.state.user)
            })
        });
    }
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.room} style={styles.btnRoomNavigate}>
                    <Text style={styles.btnText}>Create room</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.viewInformation} style={styles.btnQuizzNavigate}>
                    <Text style={styles.btnText}>Informations</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.user} style={styles.btnUserNavigate}>
                    <Text style={styles.btnText}>Gestion des Utilisateurs/ Joueurs</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.quizz} style={styles.btnQuizzNavigate}>
                    <Text style={styles.btnText}>Quizzs</Text>
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
    btnUserNavigate:{
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        marginTop:20,
        padding: 10,
        width:300
    },
    btnRoomNavigate:{
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        padding: 10,
        width:300
    },
    btnQuizzNavigate:{
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        marginTop:20,
        padding: 10,
        width:300
    },
    btnText:{
        color: '#FFF',
        fontWeight: '700',
        fontSize: 25
    }
})

export default Admin;