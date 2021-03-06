import React from 'react';
import { StyleSheet, Text, View, Navigator, Button, TouchableOpacity } from 'react-native';

import Login from './src/components/Login/Login'; 
import User from './src/components/User/User';
import Authentication from './src/Services/Authentication';
import AppNavigator from './src/AppNavigator';
import {AsyncStorage} from 'react-native';
import { API_URL_DEV } from 'react-native-dotenv'

// import Routes from './src/Routes';
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
        user : null,
        token : ""
    }
}

  componentDidMount(){
    console.log(API_URL_DEV)
  }

  render() {
    return (
      <View style={styles.container}>
        <AppNavigator style={styles.main}/>   

        <TouchableOpacity style={styles.fullWidthButton} onPress={this.logout}>
          <Text style={styles.fullWidthButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>  
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main:{
    flex:1,
  },
  fullWidthButton: {
    backgroundColor: 'black',
    position: "absolute",
    right: 5,
    top: 30,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    paddingTop: 5,
    paddingLeft:5 ,
    paddingRight: 5,
    paddingBottom: 5
  },
  fullWidthButtonText: {
    fontSize:12,
    color: 'white',
    justifyContent: 'center',
  }

});
