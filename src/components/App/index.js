import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import * as routes from '../../constants/routes';
import Home from '../Home';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path={routes.SIGN_IN} component={SignInPage} />
          <Route path={routes.SIGN_UP} component={SignUpPage} />
          <Route path={routes.HOME} component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
