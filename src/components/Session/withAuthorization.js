import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {


    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => authUser ? <Component /> : <Redirect to={routes.HOME}/>}
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAuthorization);
};

export default withAuthorization;