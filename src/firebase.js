import * as firebase from 'firebase';


const config = {
    apiKey: "AIzaSyACLEwNPWiOcy2d9_RftNweEtmaLPOSb3Q",
    authDomain: "hakaton-49ce9.firebaseapp.com",
    databaseURL: "https://hakaton-49ce9.firebaseio.com",
    projectId: "hakaton-49ce9",
    storageBucket: "hakaton-49ce9.appspot.com",
    messagingSenderId: "929597650782"
  };


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const db = firebase.database().ref();
export const usersDbRef = db.child('users');
export const habitsDbRef = db.child('habits');
export const auth = firebase.auth();
// // категория придет из формы после создания таска
// const category = '';
//
// const userId = auth.currentUser.uid;
//
// habitsDbRef.child(`${category}/${userId}`).push({
//     text: '11111'
// });