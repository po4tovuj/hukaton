export { auth, habitsDbRef, usersDbRef, db } from './firebase';
export {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut,
  initAuthStateListener,
    changeName,
  doPasswordReset,
  doPasswordUpdate,
} from './auth';
export {
  writeHabitData,
  deleteHabitData,
  updateHabitData,
  getDataByCategory,
  getAllAndJoin,
} from './habits';
