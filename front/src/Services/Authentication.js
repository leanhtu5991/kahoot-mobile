import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';

class Authentication extends React.Component {
    constructor(props){
        super(props);
    }

    // save token
    saveToken = async (token) => {
        try {
          await AsyncStorage.setItem('token', token);
          console.log('token saved')
        } catch (error) {
            console.log(error)
        }
      };
    //get token
    getToken = async () => {
        console.log('ok')
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
            // We have data!!
            console.log(token);
            return token
            }
        } catch (error) {
            // Error retrieving data
        }
    };
    //logout remove token
    logout = async () => {
        await AsyncStorage.clear();
        console.log(AsyncStorage)
    };

}

export default Authentication