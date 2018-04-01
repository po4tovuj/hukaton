import React, { Component } from 'react';
import styles from './App.css';
import Header from './components/Header';
import NewHabits from './components/NewHabits';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <div> Habits </div>} />
          {/* <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/watch-list" component={WatchList} /> */}
          <Route render={() => <h2>404 not found!!! sorry</h2>} />
        </Switch>
        <NewHabits />
      </div>
    );
  }
}

export default App;
