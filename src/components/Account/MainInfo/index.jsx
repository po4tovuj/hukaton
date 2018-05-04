import React from 'react';
import Title from "../Title";

import  styles from './styles.css';
import {auth} from "../../../firebase";

const MainInfo = ({name, email, onChange, changeName, nameInValid}) => {
    return (
    <form className={styles.main_info} >
      <Title title="Основная информация"/>
        <input className={styles.input} name='name' type="text" placeholder={auth.currentUser.displayName} value={name} onChange={onChange} />
        <button className={styles.button} onClick={changeName} disabled={nameInValid} type='submit'>Изменить Имя</button>
        <input className={styles.input} name='email' type="email" placeholder="Email" value={email} onChange={onChange} />

    </form>
  );
};

export default MainInfo;
