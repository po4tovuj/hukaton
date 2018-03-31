import React, { Component } from 'react';
import styles from './App.css';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
          <AuthForm />
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
