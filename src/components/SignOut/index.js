import React from 'react';
import { doSignOut } from '../../firebase';

import  styles from '../../styles/theme.css';

import { auth } from '../../firebase';

const SignOutButton = () =>
    (<button
        className={styles.btnLogout}
    type="button"
    onClick={doSignOut}
  >
        Log Out
      {/*<img className={styles.out} src={logout}/>*/}
  </button>);

export default SignOutButton;
