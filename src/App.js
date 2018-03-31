import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.css';
import CreateHabit from './components/CreateHabit';

class App extends Component {
  render() {
    return (
      <div className={styles.main}>
        <header className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h1 className={styles.title}>Welcome to React</h1>
          <CreateHabit />
        </header>
        <p className={styles.intro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
