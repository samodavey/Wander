import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import * as firebase from 'firebase'

export default class RegisterScreen extends React.Component{

  static navigationOptions = {
    headerShown: false
  };

  state = {
    name: "",
    email: "",
    password: "",
    errorMessage: null
  }

  handleSignUp = () => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(userCredentials => {
      return userCredentials.user.updateProfile({
        displayName: this.state.name
      })
    })
    .catch(error => this.setState({errorMessage: error.message}));
  }


  render() {
    return (
      <View style={styles.container}>
        
        {/* Maybe add back button? */}

        <StatusBar barStyle="light-content"></StatusBar>

        <Image 
        source={require("../assets/authHeader.png")}
        style={{marginTop: -110, marginLeft: -15}}>
        </Image>

        <Image 
        source={require("../assets/authFooter.png")}
        style={{position: "absolute", bottom: -185, right: -100}}>
        </Image>

        <View style={{position: "absolute", top: 45, alignItems: "center", width: "100%"}}>
          
          <Text style={styles.greeting}>{'Hello!\nSign up to get started.'}</Text>

          <TouchableOpacity style={styles.avatar}>
            <Ionicons name="ios-add" size={40} color="#00d589" style={{marginTop:6, marginLeft:2}}></Ionicons>
          </TouchableOpacity>
        </View>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Full Name</Text>
            <TextInput
              style={styles.input}
              autocapitalize="none"
              onChangeText={name => this.setState({name})}
              value={this.state.name}
            ></TextInput>
          </View>


          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autocapitalize="none"
              onChangeText={email => this.setState({email})}
              value={this.state.email}
            ></TextInput>
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autocapitalize="none"
              onChangeText={password => this.setState({password})}
              value={this.state.password}
              ></TextInput>
          </View>

        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={{color:"#FFF", fontWeight: "500"}}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{alignSelf: "center", marginTop: 32}} onPress={() => this.props.navigation.navigate("Login")}>
          <Text style={{color: "#414959", fontSize: 13}}>
            Already have an account? <Text style={{fontWeight: "500", color: "#00d589"}}>Login</Text>
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  greeting:{
    marginTop: 5,
    fontSize: 18,
    fontWeight: "400",
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
    marginBottom: 48,
    marginHorizontal: 30
  },
  inputTitle:{
    color:"#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase"
  },
  input:{
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D"
  },
  button:{
    marginHorizontal: 30,
    backgroundColor: "#00d589",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  avatar:{
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E1E2E6",
    marginTop:30,
    justifyContent: "center",
    alignItems: "center"
  }

});
