import React from 'react'
import {View, Text, StyleSheet, Button, Image} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import Fire from '../Fire'


export default class ProfileScreen extends React.Component {

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

    render(){
        return(
            <View style={styles.container}>
                <View style={{marginTop: 64, alignItems: "center"}}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} 
                        source={this.state.user.avatar ? {uri: this.state.user.avatar} : require('../assets/loginLogo.png')}/>
                    </View>
                    <Text style={styles.name}>{this.state.user.name}</Text>
                </View>
                {/* <Button onPress={() => {Fire.shared.signOut()}} title="Log Out"></Button> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarContainer: {
        shadowColor: "#151734",
        shadowRadius: 15,
        shadowOpacity: 0.4
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    name: {
        marginTop: 24,
        fontSize: 16,
        fontWeight: "600"
    }
})