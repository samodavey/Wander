import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyD3mgabcLPHORVerk12owHJOe2YH7rSrD8",
  authDomain: "wanderapp-5ede5.firebaseapp.com",
  databaseURL: "https://wanderapp-5ede5.firebaseio.com",
  projectId: "wanderapp-5ede5",
  storageBucket: "wanderapp-5ede5.appspot.com",
  messagingSenderId: "877989859615",
  appId: "1:877989859615:web:87284603431a7da056602a"
};

firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: HomeScreen
})

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)
