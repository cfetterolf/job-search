import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAsL0NrAwpvShdaB61A1eyn8miF6Sdm7V0",
    authDomain: "job-search-c45ff.firebaseapp.com",
    databaseURL: "https://job-search-c45ff.firebaseio.com",
    projectId: "job-search-c45ff",
    storageBucket: "job-search-c45ff.appspot.com",
    messagingSenderId: "813819049284"
  };

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
