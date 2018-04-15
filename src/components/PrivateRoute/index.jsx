import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  isAuth,
  redirectTo,
  ...rest,
}) => {
  console.log('isAuth private: ', isAuth);
  return <Route {...rest} render={props => isAuth
    ? <Component {...props} />
    : <Redirect from={props.location.pathname} to={redirectTo} />
    // : <Redirect to={{
    //       pathName: redirectTo,
    //       state: { from: props.location },
    //     }}
    //   />
  }/>
};

export default PrivateRoute;
