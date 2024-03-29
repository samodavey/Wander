import FirebaseKeys from "./config";
import firebase from "firebase"
require("firebase/firestore");

class Fire {
    constructor() {
        //HIDE THIS 
        var FirebaseKeys = {
            apiKey: "AIzaSyD3mgabcLPHORVerk12owHJOe2YH7rSrD8",
            authDomain: "wanderapp-5ede5.firebaseapp.com",
            databaseURL: "https://wanderapp-5ede5.firebaseio.com",
            projectId: "wanderapp-5ede5",
            storageBucket: "wanderapp-5ede5.appspot.com",
            messagingSenderId: "877989859615",
            appId: "1:877989859615:web:87284603431a7da056602a"
        };

        firebase.initializeApp(FirebaseKeys)
    }

    uploadPhotoAsync = async (uri, filename) => {
        //const path = `photos/${this.uid}/${Date.now}.jpg`

        return new Promise(async (res, rej) => {
            const response = await fetch(uri)
            const file = await response.blob()

            let upload = firebase.storage().ref(filename).put(file)

            upload.on("state_changed", snapshot => {}, err => {
                rej(err)
            },
            async () => {
                const url = await upload.snapshot.ref.getDownloadURL();
                res(url)
            })
        })
    }

    createUser = async user => {
        let remoteUri = null
        //Need to improve error logging
        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)

            let db = this.firestore.collection("users").doc(this.uid)

            db.set({
                name: user.name,
                email: user.email,
                avatar: null
            })

            if(user.avatar){
                remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`)

                db.set({avatar: remoteUri}, {merge: true})
            }

        } catch (err) {
            // alert ("Error: ", err.message);
            //Come up with a better way of doing
            if(!user.name){
                alert('Name required')
            }
            if(!user.email){
                alert('Email required')
            }
            if(!user.password){
                alert('Password required')
            }
            if(!user.avatar){
                alert('Avatar required')
            }
        }
    }

    signOut = () => {
        firebase.auth().signOut();
    }

    get firestore() {
        return firebase.firestore()
    }

    get uid() {
        return (firebase.auth().currentUser || {} ).uid
    }

    get timestamp() {
        return Date.now()
    }
}

Fire.shared = new Fire();
export default Fire;