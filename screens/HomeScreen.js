import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, StyleSheet, Text, View, Image, ImageBackground, Platform} from 'react-native'
import Fire from '../Fire'
import firebase from "firebase"
import { debug } from 'react-native-reanimated'


//REWRITE THIS IN YOUR OWN WAY
function * range (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}


export default class HomeScreen extends Component {
  // state = {
  //   user: {},
  //   cards: [...range(1, 50)],
  //   swipedAllCards: false,
  //   swipeDirection: '',
  //   cardIndex: 0
  // };
  componentDidMount(){
    const user = this.props.uid || Fire.shared.uid
    this.unsubscribe = Fire.shared.firestore
    .collection("users")
    .doc(user)
    .onSnapshot(doc => {
        this.setState({user: doc.data()});
    });
  }

  unsubscribe = null;
  
  
  componentWillUnmount() {
      this.unsubscribe();
  }

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
        <Swiper
          // renderCard={(card, index) => {
          //   return (
          //     <View style={styles.card}>
          //       {/* RENDER CARD NEEDS TO BE CALLED IMMEDIATELY */}  
          //       <ImageBackground source={this.state.user.avatar ? {uri: this.state.user.avatar} : require('../assets/loginLogo.png')} style={styles.cardImage} imageStyle={{borderRadius: 8}}>
          //         <Text style={styles.text}>{this.state.user.name}</Text>
          //       </ImageBackground>
          //     </View>
          //   )
          // }}
          renderCard={this.renderCard}
          useViewOverflow={Platform.OS === 'ios'}
          backgroundColor={'#FFF'}
          ref={swiper => {
            this.swiper = swiper
          }}
          onSwiped={() => this.onSwiped('general')}
          onSwipedLeft={() => this.onSwiped('left')}
          onSwipedRight={() => this.onSwiped('right')}
          onSwipedTop={() => this.onSwiped('top')}
          onSwipedBottom={() => this.onSwiped('bottom')}
          //onTapCard={this.swipeLeft}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={80}
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
                  backgroundColor: 'black',
                  borderColor: 'black',
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
                  backgroundColor: 'black',
                  borderColor: 'black',
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
            }
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        >
          {/* <Button onPress={() => this.swiper.swipeBack()} title='Swipe Back' /> */}
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