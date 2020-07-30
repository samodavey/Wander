import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation, Dimensions, ImageBackground } from 'react-native';
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
        <Text style={styles.greeting}>{'Hello again.\nWelcome Back.'}</Text>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

        <View style={styles.form}>
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
        style={{alignSelf: "center", bottom: 32}}
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


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  greeting:{
    bottom: 100,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center"
  },
  errorMessage:{
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  error:{
    color: "#00d589",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  },
  form:{
    bottom: 100,
    marginHorizontal: 30
  },
  inputTitle:{
    color:"#FFF",
    fontSize: 10,
    textTransform: "uppercase"
  },
  input:{
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: WIDTH - 55,
    paddingLeft: 35,
    fontSize: 15,
    color: "#161F3D"
  },
  inputIcon:{
    position: 'absolute',
    top: 15
  },
  button:{
    marginHorizontal: 30,
    bottom: 50,
    backgroundColor: "#00d589",
    borderRadius: 15,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  }

});
