// import FirebaseKeys from "./config";
import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Ionicons} from '@expo/vector-icons'

import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

import HomeScreen from './screens/HomeScreen'
import MessagesScreen from './screens/MessagesScreen'
import ProfileScreen from './screens/ProfileScreen'

import * as firebase from 'firebase'

// Need to privatise these keys!!!
var firebaseConfig = {
  apiKey: "AIzaSyD3mgabcLPHORVerk12owHJOe2YH7rSrD8",
  authDomain: "wanderapp-5ede5.firebaseapp.com",
  databaseURL: "https://wanderapp-5ede5.firebaseio.com",
  projectId: "wanderapp-5ede5",
  storageBucket: "wanderapp-5ede5.appspot.com",
  messagingSenderId: "877989859615",
  appId: "1:877989859615:web:87284603431a7da056602a"
};

//Checks if firebase apps has loaded to avoid error
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

const AppTabNavigator = createBottomTabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="md-contact" size={28} color={tintColor}/>
      }
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="md-paper-plane" size={28} color={tintColor}/>
      }
    },
    Messages: {
      screen: MessagesScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-chatboxes" size={28} color={tintColor}/>
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#00d589",
      inactiveTintColor: "#B8BBC4",
      showLabel: false
    }
  }
)

const AuthStack = createStackNavigator({
  Register: RegisterScreen,
  Login: LoginScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)
