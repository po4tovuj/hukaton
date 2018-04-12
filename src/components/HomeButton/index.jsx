import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/theme.css';
import { HOME } from '../../constants/routes';

const homeBtn = () => (
  <Link to={HOME} className={styles.btnLogout}>
    HOME
  </Link>
);

export default homeBtn;
