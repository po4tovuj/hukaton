import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  isAuth,
  redirectTo,
  ...rest,
}) => {
  console.log('isAuth: ', isAuth);
  return <Route {...rest} render={props => isAuth
    ? <Component {...props} />
    : <Redirect to={{
          pathName: redirectTo,
          state: { from: props.location },
        }}
      />
  }/>
};

export default PrivateRoute;
