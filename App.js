import FirebaseKeys from "./config";
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
import { Image } from 'react-native'

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="md-contact" size={30} color={tintColor}/>
          }
        },
        Home: {
          screen: HomeScreen,
          navigationOptions: {
             tabBarIcon: ({tintColor}) => <Ionicons name="md-paper-plane" size={30} color={tintColor}/>
             //Maybe use the logo?
             //tabBarIcon: ({tintColor}) => <Image source={require('./assets/mainIcon.png')} color={tintColor}></Image>
          }
        },
        Messages: {
          screen: MessagesScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-chatboxes" size={30} color={tintColor}/>
          }
        }
      },
      {
        tabBarOptions: {
          activeTintColor: "#00d589",
          inactiveTintColor: "#B8BBC4",
          showLabel: false
        },
      }
    ),
  }
)

// const AppTabNavigator = 
// );

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen
  },
  {
    initialRouteName: "Register"
  } 
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)
