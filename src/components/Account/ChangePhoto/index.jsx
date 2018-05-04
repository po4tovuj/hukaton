import React from 'react';
import Title from "../Title";
import Ava from '../../Ava';
import  styles from './styles.css';
import {auth } from '../../../firebase';

const ChangePhoto = () => {
  return (
    <div className={styles.change_photo}>
      <Ava />

      <div className={styles.wrapper}>
          <Title title="Изменить фото профиля"/>
          <input type='file'/>
      </div>

    </div>
  );
};

export default ChangePhoto;
