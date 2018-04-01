import React from 'react';
import { doSignOut } from '../../firebase';
import  styles from '../../styles/theme.css';

const SignOutButton = () =>
    (<button
        className={styles.btnLogout}
    type="button"
    onClick={doSignOut}>
        Log Out
  </button>);

export default SignOutButton;
