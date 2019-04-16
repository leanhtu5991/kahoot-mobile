import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './components/Login/Login';
import User from './components/User/User';
import Register from './components/Register/Register';
import DetailUser from './components/User/DetailUser';
export default class AppNavigator extends Component {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Login" initial={true}/>
			      <Scene key="user" component={User} title="User"/>
            		<Scene key="register" component={Register} title="Register"/>
					<Scene key="detailUser" component={DetailUser} title="DetailUser"/>
					
			    </Stack>
			 </Router>
			)
	}
}