import React from 'react';
import { Redirect } from 'react-router-dom';
import  styles from '../../styles/theme.css';
import {HOME} from "../../constants/routes";

const goHome = () => (window.location = '/home');
const homeBtn = () => (
    <button className={styles.btnLogout} type="button" onClick={ goHome } >
        HOME
    </button>);

 export default homeBtn;