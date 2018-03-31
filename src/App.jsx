import React, { Component } from 'react';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import { Route, Switch } from 'react-router-dom';
import {auth} from  './firebase';
class App extends Component {
    state = {
        isLoggedIn: false,
    };
    componentWillMount () {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    isLoggedIn: true
                });
                console.log("user is LoggedIn");

            } else {
                this.setState({
                    isLoggedIn: false,
                });
                console.log("user is LoggedOut");
            }
        });
    }
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
