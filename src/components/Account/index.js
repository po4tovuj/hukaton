import React from 'react';

import AuthUserContext from '../Session/AuthUserContext';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';
import styles from './styles.css';

const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>{
      console.log(authUser);
      return (
      <div className={styles.title}>
        <h1>Hello my dear: {authUser.username}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>)}
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);