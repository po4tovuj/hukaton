import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyArsopqnR-jrcpw29ssahiPxucnbup8-74",
    authDomain: "habits-app-fe3.firebaseapp.com",
    databaseURL: "https://habits-app-fe3.firebaseio.com",
    projectId: "habits-app-fe3",
    storageBucket: "habits-app-fe3.appspot.com",
    messagingSenderId: "913391943247",
  };

firebase.initializeApp(config);

export default firebase;

export const auth = firebase.auth();
export const db = firebase.database().ref();
export const usersDbRef = db.child('users');
export const habitsDbRef = db.child('habits');
