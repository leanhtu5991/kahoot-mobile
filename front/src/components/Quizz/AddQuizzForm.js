import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { API_URL_DEV } from 'react-native-dotenv'
class AddQuizzForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            quizz:{
                question: "",
                answer: {
                    a1: "",
                    a2: "",
                    a3: "",
                    a4: ""
                },
                correct : "",
                user: this.props.navigation.getParam('user')
            }
        }
    }
   
    submitAddQuizz=()=>{
        fetch('http://192.168.0.17:3000/api/addQuizz',{
            method: "POST",
            body: JSON.stringify(this.state.quizz),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((res) => {
            this.setState({
                isLoading: false
            })
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
    componentDidMount(){
      }
    cancelAddQuizz(){
        this.props.navigation.goBack();
    }
    render(){
        return(
            <View style={styles.container}>
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
                    <TouchableOpacity onPress={this.submitAddQuizz} style={styles.btnFormAddQuizz}>
                        <Text style={styles.btnText}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.cancelAddQuizz()} style={styles.btnCancel}>
                        <Text style={styles.btnText}>Annuler</Text>
                    </TouchableOpacity>
                </View>
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
        color:"black",
        paddingHorizontal:10
    },
    viewBtn:{
        marginLeft:20,
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
    },
    btnFormAddQuizz:{
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        width : 100
    },
    btnCancel:{
        backgroundColor: 'red',
        paddingVertical: 10,
        width : 100
    },
    btnText:{
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    }
})
export default AddQuizzForm