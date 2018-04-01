
import React, { Component } from 'react';
import Navigation from '../Navigation';

import styles from './styles.css';

export default class Header extends Component {
    render () {
        return (
            <header className={styles.header}>
            <Navigation />
            </header>
        )
    }
}

