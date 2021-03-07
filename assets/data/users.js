import firebase, { firestore } from "firebase"
import { Component, useState, useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";

//Not very efficient considering it will be on a realtime HUGE database
//Consider how to change this in the future
//And how to filter user preferences

// firestore()
//         .collection('users')
//         .onSnapshot(querySnapshot => {
//             const users = [];
            
//             querySnapshot.forEach(documentSnapshot => {
//                 users.push({
//                     ...documentSnapshot.data(),
//                     key: documentSnapshot.id,
//                 });
//             });
//         })

async function Users(){
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
        .collection('users')
        .get()
        .onSnapshot(querySnapshot => {
            const users = [];
            
            querySnapshot.forEach(documentSnapshot => {
                users.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            //console.log(users);
            setUsers(users);
            setLoading(false);
        })
        return () => subscriber();
    }, [])

    if(loading){
        return <ActivityIndicator/>;
    }
}

module.exports = [
    {
        id: 1,
        name: 'Joe',
        status: 'Online',
        match: '78',
        description:
            'Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.',
        message:
            'I will go back to Gotham and I will fight men Iike this but I will not become an executioner.',
        image: require('../exampleusers/User02.jpg')
    },
    
];