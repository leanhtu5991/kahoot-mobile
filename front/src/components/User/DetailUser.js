import React, {Component} from 'react';
import {Alert, StyleSheet, View, Image, TextInput, Text, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import { API_URL_DEV } from 'react-native-dotenv';
import Dialog from "react-native-dialog";

class DetailUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user :this.props.navigation.getParam('user'),
            message: "",
            showFormModify: false,
            dialogVisible: false
        }      
        this.openModifyUser = this.openModifyUser.bind(this);
        this.cancel = this.cancel.bind(this);
        this.modifyUser = this.modifyUser.bind(this)
        this.delUser = this.delUser.bind(this)
    }

    showDialog = () => {
        this.setState({ dialogVisible: true });
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleDelete = () => {
        this.setState({ dialogVisible: false });
        console.log(this.state.user._id)
        fetch(API_URL_DEV+'/api/deleteUser/'+this.state.user._id,{
            method: "DELETE",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then(
            (res) => {
            this.setState({
                message: res.message,
                });
            }
        )
    };
    delUser(){
        console.log("here")
    }
    componentDidMount(){
    }

    openModifyUser(){
        this.setState({
            showFormModify: true,
            message : ""
        });
    }
    cancel(){
        this.setState({
            showFormModify: false
        });
    }
    updateValue(text, field){
        let obj = this.state.user;
        if(field=='email'){
            obj.email = text
            this.setState( {user: obj})
        } else if(field == 'isAdmin'){
            obj.isAdmin = text
            this.setState( {user: obj})
        } else if(field == 'name'){
            obj.name = text
            this.setState({user: obj})
        } else if(field == 'password'){
            obj.password = text
            this.setState({user: obj})
        }
    }

    modifyUser(){
        fetch(API_URL_DEV+'/api/updateUser',{
            method: "POST",
            body: JSON.stringify(this.state.user),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((res) => {
            this.setState(
                {
                    message: res.message,
                    showFormModify: false
                }
            )
        })
    }
    
    render(){
        let role;
        if (this.state.user.isAdmin == true) {
            role = "Admin"
        } else {
            role = "User"
        }
        return(
            <View style={styles.container}>
                 <View style={styles.main}>
                    <Text style={{fontSize: 20}}>{'Name: '+ this.state.user.name}</Text>
                    <Text style={{fontSize: 20}}>{'Email: '+this.state.user.email}</Text>
                    <Text style={{fontSize: 20}}>{'Role: '+role}</Text>
                    <Text style={{fontSize: 20}}>{'Score: '+this.state.user.score}</Text>
                </View>
                {!this.state.showFormModify ?
                <View style={styles.viewBtn}>
                    <TouchableOpacity onPress={this.openModifyUser} style={styles.buttonModifyUser}>
                        <Text style={styles.buttonModifyUserText}>Modifier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showDialog} style={styles.buttonDelUser}>
                        <Text style={styles.buttonDelUserText}>Supprimer</Text>
                    </TouchableOpacity>
                </View>
                : null
                }
                {this.state.showFormModify ?
                <View style={styles.formModify}>
                    <TextInput
                        placeholder="Name"
                        style={styles.input}
                        value = {this.state.user.name}
                        onChangeText={(text)=>this.updateValue(text, 'name')}
                    />
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        value = {this.state.user.email}
                        onChangeText={(text)=>this.updateValue(text, 'email')}
                    />
                    <TextInput
                        placeholder="Role"
                        style={styles.input}
                        value = {role}
                        onChangeText={(text)=>this.updateValue(text, 'role')}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        style={styles.input}
                        value = {role}
                        onChangeText={(text)=>this.updateValue(text, 'password')}
                    />
                    <View style={styles.viewBtn}>
                        <TouchableOpacity onPress={this.modifyUser} style={styles.buttonModifyUser}>
                            <Text style={styles.buttonModifyUserText}>Modifier</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.cancel} style={styles.buttonCancel}>
                            <Text style={styles.buttonCancelText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                : null
                }
                <View>
                    <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Account delete</Dialog.Title>
                    <Dialog.Description>
                        Do you want to delete this account? You cannot undo this action.
                    </Dialog.Description>
                        <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                        <Dialog.Button label="Delete" onPress={this.handleDelete} />
                    </Dialog.Container>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        flex: 1,
    },
    main : {
        marginTop : 80,
        marginLeft:20,
    },
    viewBtn:{
        marginLeft:20,
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
    },
    formModify:{
        marginTop : 80,
        marginLeft:20,
        // display: 'none'
    },
    buttonDelUser:{
        backgroundColor: 'red',
        paddingVertical: 10,
        width : 100,
    },
    buttonCancel:{
        backgroundColor: 'red',
        paddingVertical: 10,
        width : 100
    },
    buttonDelUserText:{
        textAlign: 'center',
        color: 'black',
        fontWeight: '700'
    },
    buttonCancelText:{
        textAlign: 'center',
        color: 'black',
        fontWeight: '700'
    },
    buttonModifyUser:{
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        width : 100
    },
    buttonModifyUserText:{
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    },
    input:{
        height:40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom:20,
        color:"black",
        paddingHorizontal:10
    },
})
export default DetailUser