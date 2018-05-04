import React from 'react';
import Title from "../Title";
import styles from './styles.css';

const ChangePassword = ({onChange}) => {
  return (
    <div className={styles.change_pass} onChange={(evt) => onChange(evt)} >
      <Title title="Изменить пароль" />
      <input name="oldpass" className={styles.input} type="password" placeholder="Старый пароль"/>
      <input name="newpass" className={styles.input} type="password" placeholder="Новый пароль"/>
      <input name="confirmpass" className={styles.input} type="password" placeholder="Повторить новый пароль"/>

    </div>
  );
};

export default ChangePassword;
