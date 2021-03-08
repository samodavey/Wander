import * as React from 'react';
import styles from "../components/styles/style.js"
import { Text, View, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation, Dimensions, ImageBackground } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import GradientButton from 'react-native-gradient-buttons';
import * as firebase from 'firebase'

const {width : WIDTH} = Dimensions.get('window')

export default class LoginScreen extends React.Component{

  static navigationOptions = {
    headerShown: false
  };

  state = {
    email: "",
    password: "",
    errorMessage: null
  }

  handleLogin = () => {
    const {email, password} = this.state

    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => this.setState({errorMessage: error.message}))
  };

  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <ImageBackground source={require('../assets/backgrounds/cambodia.jpg')} style={{flex:1, resizeMode: "cover", justifyContent: "center"}}>

      <View style={styles.container}>
        
        <StatusBar barStyle="light-content"></StatusBar>
        
        <Image 
        source={require("../assets/transparent-logo.png")} 
        style={{flex: 1, width: 250, resizeMode: 'contain', bottom: 50, alignSelf: 'center'}}>
        </Image>
        {/* <Text style={styles.greeting}>{'Hello again.\nWelcome Back.'}</Text> */}

        <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

        <View style={styles.loginForm}>
          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <Ionicons 
                name="ios-mail" 
                size={30} 
                color="#00d589" 
                style={styles.inputIcon}>
            </Ionicons>
            <TextInput
              style={styles.input}
              autocapitalize="none"
              onChangeText={email => this.setState({email})}
              value={this.state.email}
            ></TextInput>
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Password</Text>
            <Ionicons 
                name="ios-key" 
                size={30} 
                color="#00d589" 
                style={styles.inputIcon}>
            </Ionicons>
            <TextInput
              style={styles.input}
              secureTextEntry
              autocapitalize="none"
              onChangeText={password => this.setState({password})}
              value={this.state.password}
              ></TextInput>
          </View>

        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={{color:"#FFF", fontWeight: "500"}}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.loginText}
        onPress={() => this.props.navigation.navigate("Register")}>
          <Text style={{color: "#FFF", fontSize: 13}}>
            New to Wander? <Text style={{fontWeight: "500", color: "#00d589"}}>Sign Up</Text>
          </Text>
        </TouchableOpacity>

      </View>
      </ImageBackground>
    );
  }
}