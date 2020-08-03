import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, LayoutAnimation, Image, ImageSourcePropType } from 'react-native';
import { shape, string, number } from 'prop-types'
import * as firebase from 'firebase'
import Fire from '../Fire'
import {Ionicons, Fontisto} from '@expo/vector-icons'

export default class HomeScreen extends React.Component{

  state = {
    user: {}
  };

  unsubscribe = null;

  componentDidMount(){
    const user = this.props.uid || Fire.shared.uid
    this.unsubscribe = Fire.shared.firestore
    .collection("users")
    .doc(user)
    .onSnapshot(doc => {
        this.setState({user: doc.data()});
    });
  }

  componentWillUnmount() {
      this.unsubscribe();
  }

  signOutUser = () => {
    firebase.auth().signOut();
  }

  render(){
    LayoutAnimation.easeInEaseOut();
    
    return(
      <View style={styles.container}>
        {/* <Fontisto name="earth" size={150} color={'#B8BBC4'}/> */}
        <Text>Hi {this.state.user.name}!</Text>

        <TouchableOpacity style={{marginTop:32}} onPress={this.signOutUser}>
          <Text>Logout</Text>
        </TouchableOpacity>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
