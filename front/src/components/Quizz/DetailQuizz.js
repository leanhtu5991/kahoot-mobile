import React, {Component} from 'react';
import {Alert, StyleSheet, View, Image, TextInput, Text, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import { API_URL_DEV } from 'react-native-dotenv';
import Dialog from "react-native-dialog";;

class DetailQuizz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quizz :this.props.navigation.getParam('quizz'),
            message: "",
            showFormModify: false,
            dialogVisible: false
        }      
        this.openModifyQuizz = this.openModifyQuizz.bind(this);
        this.cancel = this.cancel.bind(this);
        this.modifyQuizz = this.modifyQuizz.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
    showDialog = () => {
        this.setState({ dialogVisible: true });
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };
    handleDelete = () => {
        this.setState({ dialogVisible: false });
        fetch('http://192.168.0.17:3000/api/deleteQuizz/'+this.state.quizz._id,{
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
                this.props.navigation.navigate('quizz', {
                    user: this.state.user
                })
            }
        )
    }
    componentDidMount(){
        console.log(this.state.quizz)
    }

    openModifyQuizz(){
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

    
    modifyQuizz(){
        fetch('http://192.168.0.17:3000/api/updateQuizz',{
            method: "POST",
            body: JSON.stringify(this.state.quizz),
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
            this.props.navigation.navigate('quizz', {
                user: this.state.user
            })
        })
    }
    
    updateValue(text, field){
        let obj = this.state.quizz;
        if(field=='question'){
            obj.question = text
            this.setState( {quizz: obj})
        } else if(field == 'answer1'){
            obj.answer.a1 = text
            this.setState( {quizz: obj})
        } else if(field == 'answer2'){
            obj.answer.a2 = text
            this.setState( {quizz: obj})
        } else if(field == 'answer3'){
            obj.answer.a3 = text
            this.setState( {quizz: obj})
        } else if(field == 'answer4'){
            obj.answer.a4 = text
            this.setState( {quizz: obj})
        } else if(field == 'correct'){
            obj.correct = text
            this.setState( {quizz: obj})
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.main}>
                    <Text style={{fontSize: 20}}>{'Question: '+ this.state.quizz.question}</Text>
                    <Text style={{fontSize: 20}}>{'Answer1: '+this.state.quizz.answer.a1}</Text>
                    <Text style={{fontSize: 20}}>{'Answer2: '+this.state.quizz.answer.a2}</Text>
                    <Text style={{fontSize: 20}}>{'Answer3: '+this.state.quizz.answer.a3}</Text>
                    <Text style={{fontSize: 20}}>{'Answer4: '+this.state.quizz.answer.a4}</Text>
                    <Text style={{fontSize: 20}}>{'Answer correct: '+this.state.quizz.correct}</Text>
                </View>
                {!this.state.showFormModify ?
                <View style={styles.viewBtn}>
                    <TouchableOpacity onPress={this.openModifyQuizz} style={styles.buttonModifyQuizz}>
                        <Text style={styles.buttonModifyQuizzText}>Modifier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleDelete} style={styles.buttonDelQuizz}>
                        <Text style={styles.buttonDelQuizzText}>Supprimer</Text>
                    </TouchableOpacity>
                </View>
                : null
                }
                {this.state.showFormModify ?
                <View style={styles.formModify}>
                    <TextInput
                        placeholder="Question"
                        style={styles.input}
                        value = {this.state.quizz.question}
                        onChangeText={(text)=>this.updateValue(text, 'question')}
                    />
                    <TextInput
                        placeholder="Answer1"
                        style={styles.input}
                        value = {this.state.quizz.answer.a1}
                        onChangeText={(text)=>this.updateValue(text, 'answer1')}
                    />
                    <TextInput
                        placeholder="Answer2"
                        style={styles.input}
                        value = {this.state.quizz.answer.a2}
                        onChangeText={(text)=>this.updateValue(text, 'answer2')}
                    />
                    <TextInput
                        placeholder="Answer3"
                        style={styles.input}
                        value = {this.state.quizz.answer.a3}
                        onChangeText={(text)=>this.updateValue(text, 'answer3')}
                    />
                    <TextInput
                        placeholder="Answer4"
                        style={styles.input}
                        value = {this.state.quizz.answer.a4}
                        onChangeText={(text)=>this.updateValue(text, 'answer4')}
                    />
                    <TextInput
                        placeholder="Answer correct"
                        style={styles.input}
                        value = {this.state.quizz.correct}
                        onChangeText={(text)=>this.updateValue(text, 'correct')}
                    />
                    <View style={styles.viewBtn}>
                        <TouchableOpacity onPress={this.modifyQuizz} style={styles.buttonModifyQuizz}>
                            <Text style={styles.buttonModifyQuizzText}>Modifier</Text>
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
                        Do you want to delete this quizz? You cannot undo this action.
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
        marginTop : 20,
        marginLeft:20,
        // display: 'none'
    },
    buttonDelQuizz:{
        backgroundColor: 'red',
        paddingVertical: 10,
        width : 100,
    },
    buttonCancel:{
        backgroundColor: 'red',
        paddingVertical: 10,
        width : 100
    },
    buttonDelQuizzText:{
        textAlign: 'center',
        color: 'black',
        fontWeight: '700'
    },
    buttonCancelText:{
        textAlign: 'center',
        color: 'black',
        fontWeight: '700'
    },
    buttonModifyQuizz:{
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        width : 100
    },
    buttonModifyQuizzText:{
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
export default DetailQuizz