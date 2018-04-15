import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import Habits from '../Habits';
import Header from '../Header';
import * as routes from '../../constants/routes';
import PrivateRoute from '../PrivateRoute/index';
import {
  initAuthStateListener,
  doSignOut,
} from '../../firebase';
import './index.css';

export const HabitContext = React.createContext();

const INITIAL_STATE = {
    email: '',
    displayName: '',
    isLoading: false,
    userId: null,
    isAuth: false,
};

class App extends React.Component {
  state = {
      ...INITIAL_STATE,
  };

  componentDidMount() {
    initAuthStateListener(this.onSignIn, this.onSignOut);
  }

  onSignIn = user => {
    this.setState({
      isLoading: false,
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      isAuth: true,
    });
  };

  onSignOut = () => {
    doSignOut().then(() => {
      console.log('doSignOut then');
      this.setState({ ...INITIAL_STATE }//, () =>
        //this.props.history.push(routes.SIGN_IN),
      );
    });
  };


  render() {
    const { isAuth } = this.state;
    console.log('isAuth app: ', isAuth);

    return (
      <div className="app">
        <HabitContext.Provider
          value={{
            ...this.state,
            onSignOut: this.onSignOut,
          }}>
          <Header />

          <Switch>
            {/* {!isAuth && <Route exact path={routes.SIGN_IN} component={SignInPage} />}
            {!isAuth && <Route path={routes.SIGN_UP} component={SignUpPage} />}
            {isAuth && <Route path={routes.HOME} component={Habits} />} */}

            <PrivateRoute exact path={routes.SIGN_IN} isAuth={!isAuth} component={SignInPage} redirectTo={routes.HOME} />
            <PrivateRoute path={routes.SIGN_UP} isAuth={!isAuth} component={SignUpPage} redirectTo={routes.HOME} />
            <PrivateRoute path={routes.HOME} isAuth={isAuth} component={Habits} redirectTo={routes.SIGN_IN} />
          </Switch>
        </HabitContext.Provider>
      </div>
    );
  }
}

export default App;
