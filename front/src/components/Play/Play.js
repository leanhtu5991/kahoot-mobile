import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Button, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Play extends React.Component {
    constructor(props) {
        super(props),
        this.state = {
            user :this.props.navigation.getParam('user'),
            isLoading: true,
            token: "",
            quizz : {
                question: "",
                a1: "",
                a2: "",
                a3: "",
                a4: "",
                correct:"",
            },
            quizz:[],
            score:0,
            answerSelect: "",
            numberQuestion : 0,
            numberQuestion1:1, 
            allQuestion:0,
            finish : false,
            pressStatus: ""
        }
    }
    getQuizz =()=>{
        fetch('http://192.168.0.17:3000/api/getQuizz/'+this.state.user._id,{
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then(
            (responseJson) => {
                console.log(responseJson)
                this.setState({
                    isLoading: false,
                    quizz : {
                        question: responseJson[this.state.numberQuestion].question,
                        a1: responseJson[this.state.numberQuestion].answer.a1,
                        a2: responseJson[this.state.numberQuestion].answer.a2,
                        a3: responseJson[this.state.numberQuestion].answer.a3,
                        a4: responseJson[this.state.numberQuestion].answer.a4,
                        correct:responseJson[this.state.numberQuestion].correct,
                    },
                    quizzs: responseJson,
                    allQuestion: responseJson.length
                });
                console.log(this.state.quizz)
            }    
        )
    }
    componentDidMount= async () =>{
        console.log(this.state.user)
        this.getQuizz();
    }
   
    selectAnswer(text, field){
        this.setState({
            answerSelect : text,
            pressStatus: field
        })
    }
    submitAnswer(){
        if(this.state.quizzs.length > this.state.numberQuestion+1){
            this.state.numberQuestion ++;
            this.state.numberQuestion1++
            var number = this.state.numberQuestion;
            this.setState({
                quizz:{
                    question: this.state.quizzs[number].question,
                    a1: this.state.quizzs[number].answer.a1,
                    a2: this.state.quizzs[number].answer.a2,
                    a3: this.state.quizzs[number].answer.a3,
                    a4: this.state.quizzs[number].answer.a4,
                    correct:this.state.quizzs[number].correct,
                }, 
            })
            if(this.state.quizz.correct  == this.state.answerSelect){
                this.state.score = this.state.score+1
            }
        } else {
            console.log(this.state.score)
            this.setState({
                finish:true
            })
        }
    }
    render(){
        return(
            <View style={styles.container}>
                {!this.state.finish ?
                <View>
                    <Text style={styles.question}>{"Question "+ this.state.numberQuestion1}</Text>
                    <Text style={styles.question}>{this.state.quizz.question}</Text>
                    <TouchableOpacity onPress={(text)=>this.selectAnswer(this.state.quizz.a1, 'answerA')} style={this.state.pressStatus=='answerA'
                        ? styles.buttonPress
                        : styles.btnAnswer}>
                        <Text style={styles.btnText}>{'A : '+this.state.quizz.a1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(text)=>this.selectAnswer(this.state.quizz.a2, 'answerB')} style={this.state.pressStatus=='answerB'
                        ? styles.buttonPress
                        : styles.btnAnswer}>
                        <Text style={styles.btnText}>{'B : '+this.state.quizz.a2}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(text)=>this.selectAnswer(this.state.quizz.a3, 'answerC')} style={this.state.pressStatus=='answerC'
                        ? styles.buttonPress
                        : styles.btnAnswer}>
                        <Text style={styles.btnText}>{'C : '+this.state.quizz.a3}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(text)=>this.selectAnswer(this.state.quizz.a4, 'answerD')} style={this.state.pressStatus=='answerD'
                        ? styles.buttonPress
                        : styles.btnAnswer}>
                        <Text style={styles.btnText}>{'D : '+this.state.quizz.a4}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.submitAnswer()} style={styles.btnSubmitAnswer}>
                            <Text style={styles.btnText}>Valid</Text>
                    </TouchableOpacity>
                </View>
                    : null
                }
                {this.state.finish ?
                <Text style={styles.question}>{'Score :'+this.state.score+'/'+this.state.allQuestion}</Text>
                    :null
                } 
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
    buttonPress:{
        backgroundColor: '#7FFF00',
        paddingVertical: 10,
        marginTop:20,
        padding: 10,
        width:300
    },
    btnAnswer:{
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        marginTop:20,
        padding: 10,
        width:300
    },
    btnAnswerB:{
        backgroundColor: '#2980b9',
        marginTop:20,
        paddingVertical: 10,
        padding: 10,
        width:300
    },
    btnAnswerC:{
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        marginTop:20,
        padding: 10,
        width:300
    },
    btnAnswerD:{
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
    },
    question:{
        color: '#FFF',
        fontWeight: '700',
        fontSize: 30
    },
    btnSubmitAnswer:{
        marginTop:20,
        backgroundColor: '#A52A2A',
        padding: 10,
        justifyContent:'center',
        alignItems: 'center'

    }
})
export default Play