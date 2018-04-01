import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';
import AuthUserContext from '../Session/AuthUserContext';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';
import { Ava } from '../Avatar';
import Header from "../Header";

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>(
  <ul className={styles.ul}>
      {/*<li className={styles.navlist}></li>*/}
    <li className={styles.navlist}><Link to={routes.ACCOUNT}><Ava /></Link></li>
    <li className={styles.navlist}><SignOutButton /></li>
  </ul>);

const NavigationNonAuth = () => (
        <ul>
            {/*<li><Link to={routes.SIGN_IN}>Sign In</Link></li>*/}
        </ul>
);


export default Navigation;
