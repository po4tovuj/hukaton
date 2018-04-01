import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';
import AuthUserContext from '../Session/AuthUserContext';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';
import { Ava } from '../Avatar';
import HomeBtn from  '../HomeButton';
const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>(
  <ul className={styles.ul}>
      <li className={styles.navlist}><HomeBtn /></li>
      <li className={styles.navlist}><Link to={routes.ACCOUNT}><Ava /></Link></li>
    <li className={styles.navlist}><SignOutButton /></li>

  </ul>);

const NavigationNonAuth = () => (
        <ul>
            {/*<li className={styles.navlist}><Link to={routes.SIGN_IN}></Link></li>*/}
        </ul>
);


export default Navigation;
