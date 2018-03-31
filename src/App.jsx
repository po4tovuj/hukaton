import React, { Component } from 'react';
import Header from './components/Header';
import Habits from './components/Habits';
import { Route, Switch } from 'react-router-dom';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={<Habits />} />
          {/* <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/watch-list" component={WatchList} /> */}
          {/* <Route render={() => <h2>404 not found!!! sorry</h2>} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
