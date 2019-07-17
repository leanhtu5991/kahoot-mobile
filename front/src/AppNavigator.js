import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';
import Login from './components/Login/Login';

import User from './components/User/User';
import DetailUser from './components/User/DetailUser';

import Register from './components/Register/Register';

import Quizz from './components/Quizz/Quizz';
import DetailQuizz from './components/Quizz/DetailQuizz';
import AddQuizzForm from './components/Quizz/AddQuizzForm';

import Admin from './components/HomePage/Admin';
import Player from './components/HomePage/Player';
import Information from './components/HomePage/Information';

import Play from './components/Play/Play';
import Room from './components/Room/Room';
import Authentication from './Services/Authentication';
export default class AppNavigator extends Component {
	constructor(props) {
		super(props);
		authentication = new Authentication();
		this.state = {
			isLoading: true
		}
	}
	componentDidMount= async () =>{
        AsyncStorage.getItem('token').then((token) => {
            this.setState({
              isLoading: false
			});
		});
	}
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
					<Scene key="login" component={Login} title="Login" initial={true}/>
					<Scene key="user" component={User} title="User"/>
					<Scene key="register" component={Register} title="Register"/>
					<Scene key="detailUser" component={DetailUser} title="quizzDetailUser"/>
					<Scene key="quizz" component={Quizz} title="DetailQuizz"/>
					<Scene key="detailQuizz" component={DetailQuizz} title="DetailQuizz"/>
					<Scene key="addQuizzForm" component={AddQuizzForm} title="AddQuizzForm"/>
					<Scene key="admin" component={Admin} title="Admin"/>
					<Scene key="player" component={Player} title="Player"/>
					<Scene key="information" component={Information} title="Information"/>
					<Scene key="play" component={Play} title="Play"/>
					<Scene key="room" component={Room} title="Room"/>
			    </Stack>
			 </Router>
			)
	}
}