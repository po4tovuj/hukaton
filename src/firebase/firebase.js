import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyACLEwNPWiOcy2d9_RftNweEtmaLPOSb3Q",
    authDomain: "hakaton-49ce9.firebaseapp.com",
    databaseURL: "https://hakaton-49ce9.firebaseio.com",
    projectId: "hakaton-49ce9",
    storageBucket: "hakaton-49ce9.appspot.com",
    messagingSenderId: "929597650782"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.database();
// const userId = firebase.auth().curentUser.uid;
