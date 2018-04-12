import React from 'react';
import styles from '../../styles/theme.css';

const SignOutButton = ({ onSignOut }) => (
  <button className={styles.btnLogout} type="button" onClick={onSignOut}>
    Log Out
  </button>
);

export default SignOutButton;
