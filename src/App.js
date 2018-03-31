import React, { Component } from 'react';
import Header from './components/Header';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className={styles.main}>
        <Header />
      </div>
    );
  }
}

export default App;
