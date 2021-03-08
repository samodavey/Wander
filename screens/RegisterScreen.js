import * as React from 'react';
import styles from "../components/styles/style.js"
import { Text, View, TextInput, TouchableOpacity, Image, StatusBar, Switch, ScrollView, Dimensions, ImageBackground } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Fire from '../Fire';
import 'react-native-get-random-values';
import { v1 as uuidv1} from 'uuid';
import * as firebase from "firebase";
import UserPermissions from '../utilities/UserPermissions';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-material-dropdown-v2';


//NEED TO IMPLEMENT GENDER, TERMS & CONDITIONS
//FIX MAJOR & MINOR BUGS
const uuid = uuidv1();
console.log(uuid);
export default class RegisterScreen extends React.Component{

  static navigationOptions = {
    headerShown: false
  };
  state = {
    user: {
      uid: "",
      name: "",
      email: "",
      password: "",
      avatar: '../assets/loginLogo.png'
    },
    errorMessage: null,
    //switchValue: false
  };

  handlePickAvatar = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if(!result.cancelled){
      this.setState({user: { ...this.state.user, avatar: result.uri} });
    }
  };

  handleSignUp = () => {
    Fire.shared.createUser(this.state.user);
  };

  toggleTerms = (value) => {
    this.setState({switchValue : value})
  }


  render() {
    // let data = [{
    //   value: 'Male',
    // }, {
    //   value: 'Female'
    // }, {
    //   value: 'Other',
    // },];

    return (

      <ImageBackground source={require('../assets/backgrounds/cambodia.jpg')} style={{flex:1, resizeMode: "cover", justifyContent: "center"}}>
      <View style={styles.container}>

        <StatusBar barStyle="light-content"></StatusBar>

        <Image source={require("../assets/transparent-logo.png")} style={{flex: 1, width: 250, resizeMode: 'contain', alignSelf: 'center'}}></Image>

        <View style={{alignItems:"center", flex: 1}}>  
          <Text style={styles.greeting}>{'Hello!\nSign up to get started.'}</Text>
          <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
            <Ionicons 
            name="ios-camera" 
            size={40} 
            color="#00d589" 
            style={{marginTop:6, marginLeft:2}}>
            </Ionicons>   
            <Image source={{uri: this.state.user.avatar}} style={styles.avatar}/> 
          </TouchableOpacity>
        </View>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>
        
        {/* Make some fields mandatory */}
        
        <View style={styles.signupForm}>
          <View>
            <Text style={styles.inputTitle}>First Name</Text>
            <Ionicons 
                name="ios-person" 
                size={30} 
                color="#00d589" 
                style={styles.inputIcon}>
            </Ionicons>
            <TextInput
              style={styles.input}
              autocapitalize="none"
              onChangeText={name => this.setState({user: {...this.state.user, name}})}
              value={this.state.user.name}>
            </TextInput>
          </View>
          <View style={{marginTop: 32}}>
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
              onChangeText={email => this.setState({user: {...this.state.user, email}})}
              value={this.state.user.email}>
            </TextInput>
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
              onChangeText={password => this.setState({user: {...this.state.user, password}})}
              value={this.state.user.password}>
            </TextInput>
          </View>

          {/* <View style={{marginTop: 10}}>
            <Dropdown
            label='Gender'
            data={data}
            baseColor="#FFF"
            disabledItemColor="#000"
            itemColor="#000"
            selectedItemColor="#000"
            textColor="#FFF"
            />
          </View> */}

          {/* <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>I agree to the terms & conditions</Text>
            <Switch
            style={{marginTop: 5}}
            trackColor={{false:"#767577", true:"#00d589"}}
            thumbColor={{false:"#f5dd4b", true:"#00d589"}}
            onValueChange = {this.toggleTerms}
            value = {this.state.switchValue}
            ></Switch>
          </View> */}
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={{color:"#FFF", fontWeight: "500"}}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerText} onPress={() => this.props.navigation.navigate("Login")}>
          <Text style={{color: "#FFF", fontSize: 14}}>
            Already have an account? <Text style={{fontWeight: "500", color: "#00d589"}}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    );
  }
}
