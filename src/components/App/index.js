import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import styles from './index.css';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';

import './index.css';
import Sidebar from "../Sidebar";
import Habit from "../Habit";

const App = (props) =>
  <Router>
    <div className="app">
      <Navigation />

      <hr/>

      {/* <Route exact path={routes.LANDING} component={() => <LandingPage />} /> */}
      <Route  path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route  path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route  path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route  path={routes.HOME} component={HomePage} />
      <Route  path={routes.ACCOUNT} component={() => <AccountPage />} />
      {/* <Redirect to={routes.SIGN_IN} /> */}
      <hr/>

      {/* <span>Found in <a href="https://roadtoreact.com/course-details?courseId=TAMING_THE_STATE">Taming the State in React</a></span> | <span>Star the <a href="https://github.com/rwieruch/react-firebase-authentication">Repository</a></span> | <span>Receive a <a href="https://www.getrevue.co/profile/rwieruch">Developer's Newsletter</a></span> */}
    </div>
  </Router>

export default withAuthentication(App);
