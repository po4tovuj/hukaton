import React, { Component } from 'react';
import styles from './App.css';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Habit from './components/Habit';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
          <div className={styles.habit}>
              <Sidebar />
              <Habit></Habit>
          </div>
          <Switch>
          <Route exact path="/" render={() => <div>  </div>} />
          {/* <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/watch-list" component={WatchList} /> */}
          <Route render={() => <h2>404 not found!!! sorry</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
