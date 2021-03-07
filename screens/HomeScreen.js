import React, { Component, useState } from 'react'
import CardStack, { Card } from 'react-native-card-stack-swiper'
import { Button, StyleSheet, Text, View, Image, ImageBackground, Platform} from 'react-native'
import Fire from '../Fire'
//import firestore from '@react-native-firebase/firestore'
import CardItem from '../components/CardItem'
import Users from '../assets/data/users'
import firebase, { firestore } from "firebase"

// async function process_users(){
//   let users = [];

//   let usersRef = firestore().collection('users')
//   let activeRef = await usersRef.get()
//   .then(snapshot => {
//     snapshot.forEach(user => {
//       //console.log(user.data())
//       //users = user.data();
//       users.push({
//           ...user.data(),
//           key: user.id,
//       });
//     })
//   })
//   console.log(users)
//   return users;
// }

// try {
//   process_users();
//   console.log(users)
// } catch (error) {
//   console.log('Error getting documents', error)
// }

export default class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      users: [],
    }
  }

  componentDidMount(){
    this.process_users();
  }

  async process_users(){
    let usersRef = firestore().collection('users')
    let activeRef = await usersRef.get()
    .then(snapshot => {
      snapshot.forEach(user => {
        this.setState({users: user.data(), key: user.id})
      })
    })
  }

  // renderUsers(){
  //   return this.state.users.map(item => 
  //     (
  //       <Card key={this.state.key}>
  //         <CardItem
  //           name={item.name}
  //           image={item.avatar}
  //         />
  //       </Card>
  //     ))
  // }

  render () {
    console.log(this.state.users)
    //console.log(this.state.users.id)
    //TODO:
    //Make sure it doesn't load the current users profile
    //Need to be able to load the users image gallery, not just a single image
    return (
      <View style={styles.container}>
        <CardStack 
        style={styles.content} 
        loop={true}
        renderNoMoreCards={() => null}
        ref={swiper => {this.swiper = swiper}}
        >
        {Users.map((item, index) => (
          <Card style={styles.card} key={this.state.key}>
            <CardItem
              key = {{uri: this.state.key}}
              image={{uri: this.state.users.avatar}}
              name={this.state.users.name}
              // description={item.description}
              actions
              onPressLeft={() => this.swiper.swipeLeft()}
              onPressRight={() => this.swiper.swipeRight()}
            />
          </Card>
        ))}
          
        </CardStack>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: 320,
    height: 470,
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5
  },
  label: {
    lineHeight: 400,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#FFFFFF',
    backgroundColor: 'transparent'
  },
  text: {
    textAlign: 'left',
    fontSize: 35,
    backgroundColor: 'transparent',
    color: '#FFF',
    marginTop: '135%',
    marginLeft: '5%',
  },
  cardImage: {
    flex: 1,
    alignSelf: 'center',
    width: 330,
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  }
})