import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, StyleSheet, Text, View, Image, ImageBackground, Platform} from 'react-native'
import Fire from '../Fire'
//import firestore from '@react-native-firebase/firestore'
import firebase, { firestore } from "firebase"

//REWRITE THIS IN YOUR OWN WAY
function * range (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}


export default class HomeScreen extends Component {

  componentDidMount(){
    //useruid is the current users uid
    const useruid = this.props.uid || Fire.shared.uid
    var cardNum = 0;

    this.unsubscribe = Fire.shared.firestore
    .collection("users")
    .doc('TDq1YYd7ePaTWbLzTb9i5qJw09D3')
    .onSnapshot(doc => {
        this.setState({user: doc.data()});
    });

    //Correct step forward! So close!
    // firestore()
    //   .collection('users')
    //   .get()
    //   .then(querySnapshot => {
    //     //console.log('Total users: ', querySnapshot.size);

        
    //     querySnapshot.forEach(documentSnapshot => {
    //       //console.log(documentSnapshot.data());
          
    //       // console.log('User ID: ',  documentSnapshot.id, 'User Data: ', documentSnapshot.data())
    //       this.setState({user: documentSnapshot.data(), cards: cardNum})
    //       console.log(cardNum)
    //       cardNum++;

    //     })
    //   })
  }

  //NEED TO ACCESS AND POPULATE ALL OTHER USERS
  //ALSO NEED A NEW DEFAULT EMPTY / LOADING IMAGE

  //Look back at this

  //unsubscribe = null;
  
  // componentWillUnmount() {
  //     this.unsubscribe();
  // }

  constructor (props) {
    super(props)
    this.state = {
      user: {
        
      },
      cards: [...range(1, 50)],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0
    }
  }

  renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        {/* RENDER CARD NEEDS TO BE CALLED IMMEDIATELY */}  
        <ImageBackground source={this.state.user.avatar ? {uri: this.state.user.avatar} : require('../assets/loginLogo.png')} style={styles.cardImage} imageStyle={{borderRadius: 8}}>
          <Text style={styles.text}>{this.state.user.name}</Text>
        </ImageBackground>    
      </View>
    )
  };

  onSwiped = (type) => {
    console.log(`on swiped ${type}`)
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };

  swipeLeft = () => {
    this.swiper.swipeLeft()
  };
  
  render () {
    return (
      <View style={styles.container}>
        {/* Load in multiple users */}

        <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          onSwiped={() => this.onSwiped('general')}
          onSwipedLeft={() => this.onSwiped('left')}
          onSwipedRight={() => this.onSwiped('right')}
          onSwipedTop={() => this.onSwiped('top')}
          // onSwipedBottom={() => this.onSwiped('bottom')}
          backgroundColor= 'transparent'
          // onTapCard={this.swipeLeft}
          cards={this.state.user}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={80}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          stackSize={3}
          stackSeparation={15}
          overlayLabels={{
            bottom: {
              title: 'BLEAH',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }
            },
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: '#fa2549',
                  borderColor: '#fa2549',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30
                }
              }
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: '#00d589',
                  borderColor: '#00d589',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30
                }
              }
            },
            top: {
              title: 'SUPER LIKE',
              style: {
                label: {
                  backgroundColor: '#00aeff',
                  borderColor: '#00aeff',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }
            }
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        >
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    flex: 1,
    borderRadius: 10,
    // borderWidth: 3,
    // borderColor: '#000',
    justifyContent: 'center',
    // backgroundColor: 'white'
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