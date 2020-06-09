import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Ionicons} from '@expo/vector-icons'


export default class ProfileScreen extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <Text>Profile Screen</Text>
                <Ionicons name="md-settings" size={30}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})