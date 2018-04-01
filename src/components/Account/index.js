import React from 'react';

import AuthUserContext from '../Session/AuthUserContext';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';
import styles from './styles.css';
import {auth} from '../../firebase';



const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>{

      console.log(auth.currentUser.uid);
      return (
      <div className={styles.title}>
        <h1>Hello my dear: {authUser.displayName}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>)}
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);