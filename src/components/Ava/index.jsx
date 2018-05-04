import React from 'react';
import styles from './styles.css';

const Ava = () => {
  return (
    <a  className={styles["user-ava"]}>
      <div className={styles.circle}></div>
      <div className={styles.semicircle}></div>
      {/*<div className={styles.tooltip}></div>*/}
    </a>
  );
};

export default Ava;
