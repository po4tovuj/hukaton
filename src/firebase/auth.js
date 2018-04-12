import { auth, usersDbRef } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (name, email, password) => {
  return auth
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
  return auth
    .signInWithEmailAndPassword(email, password)
    .catch(error => console.log(error));
};

// Sign out
export const doSignOut = () =>
  auth.signOut().catch(error => console.log(error));

export const initAuthStateListener = (onSignIn, onSignOut) => {
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log('logged in');
      onSignIn(user);
    } else {
      console.log('logged out');
      doSignOut().then(() => onSignOut());
    }
  });
};

// Password Reset
export const doPasswordReset = email => auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = password =>
  auth.currentUser.updatePassword(password);
