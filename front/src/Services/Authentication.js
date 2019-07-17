import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import decode from 'jwt-decode';
import { API_URL_DEV } from 'react-native-dotenv'

class Authentication extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isLoading : true,
            user : null,
            token : ""
        }
        this.getProfile = this.getProfile.bind(this)
    }

    // save token
    saveToken = async (token) => {
        try {
          await AsyncStorage.setItem('token', token);
        } catch (error) {
        }
      };
    //get token
    getToken= async (token) => {
        try {
            let token = await AsyncStorage.getItem('token');
            return token
        } catch (error) {
            console.log("error while getting token");
            return 'error'
        }
    }
    //logout remove token
    logout = async () => {
        await AsyncStorage.clear();
        console.log(AsyncStorage)
    };
    isAdmin(){
        console.log(this.getToken())
        // return decode(this.getToken());
    }
    getProfile= async (token) =>{
        fetch('http://192.168.0.17:3000/api/profile',{
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            })
        })
        .then((response) => response.json())
        .then((res) => {
            return res;
        })
    }

}

export default Authentication