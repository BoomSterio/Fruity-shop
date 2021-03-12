import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDGSWQCbnPxBU6FpJNeA80is9bfKC1QSB4",
    authDomain: "fruity-shop.firebaseapp.com",
    projectId: "fruity-shop",
    storageBucket: "fruity-shop.appspot.com",
    messagingSenderId: "604929013949",
    appId: "1:604929013949:web:f3baae1f01cf9c57b49fd4",
    measurementId: "G-0MD9WL8537"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

export {db}