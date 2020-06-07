import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation } from 'react-native';
import GradientButton from 'react-native-gradient-buttons';
import * as firebase from 'firebase'

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
      <View style={styles.container}>
        
        <StatusBar barStyle="light-content"></StatusBar>

        <Image 
        source={require("../assets/authHeader.png")}
        style={{marginTop: -110, marginLeft: -15}}>
        </Image>

        <Image 
        source={require("../assets/authFooter.png")}
        style={{position: "absolute", bottom: -185, right: -100}}>
        </Image>

        <Image 
        source={require("../assets/loginLogo.png")}
        style={{marginTop:-110, alignSelf: "center", marginTop: -60}}>
        </Image>

        <Text style={styles.greeting}>{'Hello again.\nWelcome Back.'}</Text>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

        <View style={styles.form}>
          <View>
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

        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={{color:"#FFF", fontWeight: "500"}}>Sign In</Text>
        </TouchableOpacity>

        {/* <GradientButton
        style={{marginHorizontal:30, marginTop: 10}}
        text = "Sign In"
        gradientBegin = "#020024"
        gradientEnd= "#00d589"
        gradientDirection = "diagnol"
        height={60}
        radius={15}
        onPressAction={this.handleLogin}
        ></GradientButton> */}

        <TouchableOpacity
        style={{alignSelf: "center", marginTop: 32}}
        onPress={() => this.props.navigation.navigate("Register")}>
          <Text style={{color: "#414959", fontSize: 13}}>
            New to Wander? <Text style={{fontWeight: "500", color: "#00d589"}}>Sign Up</Text>
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
    borderRadius: 15,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  }

});
