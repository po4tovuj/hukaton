import * as firebase from 'firebase';

const prodConfig = {
    apiKey: "AIzaSyACLEwNPWiOcy2d9_RftNweEtmaLPOSb3Q",
    authDomain: "hakaton-49ce9.firebaseapp.com",
    databaseURL: "https://hakaton-49ce9.firebaseio.com",
    projectId: "hakaton-49ce9",
    storageBucket: "hakaton-49ce9.appspot.com",
    messagingSenderId: "929597650782"
  };

const devConfig = {
    apiKey: "AIzaSyACLEwNPWiOcy2d9_RftNweEtmaLPOSb3Q",
    authDomain: "hakaton-49ce9.firebaseapp.com",
    databaseURL: "https://hakaton-49ce9.firebaseio.com",
    projectId: "hakaton-49ce9",
    storageBucket: "hakaton-49ce9.appspot.com",
    messagingSenderId: "929597650782"
  };

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
