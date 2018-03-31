import React, { Component } from 'react';
import Logo from '../Logo';
import styles from './styles.css';

export default class Auth extends Component {
    render () {
        return (
            <header className={styles.header}>
            <Logo />
            </header>
        )
    }
}