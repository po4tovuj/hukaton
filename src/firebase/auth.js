import {auth, usersDbRef} from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (name, email, password) => {
    auth
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
                const currentUser = {
                    id: user.uid,
                    displayName: name,
                    email: user.email,
                };
                usersDbRef.child(currentUser.id).set(currentUser);
        })
        .catch(error => console.log(error));
};

// Sign In
export const doSignInWithEmailAndPassword = (email, password) => {
    auth
        .signInWithEmailAndPassword(email, password)
        .catch(error => console.log(error));
};

// Sign out
export const doSignOut = () => {
    console.log('pressed sign out button');
    auth
        .signOut()
        .catch(error => console.log(error));
};

export const doCheckAuth = (func) => {
  auth
      .onAuthStateChanged(user => {
          if(user) {
              func();
          }
          else {
              doSignOut();
          }
      })
};

// Password Reset
export const doPasswordReset = (email) =>
    auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
    auth.currentUser.updatePassword(password);

