import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';
import {HabitContext} from '../App';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';
import { Ava } from '../Avatar';
import HomeBtn from  '../HomeButton';

const Navigation = () =>
  <HabitContext.Consumer>
    {isAuth => isAuth
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </HabitContext.Consumer>;

const NavigationAuth = () =>(
  <ul className={styles.ul}>
      <li className={styles.navlist}><HomeBtn /></li>
      <li className={styles.navlist}><Link to={routes.ACCOUNT}><Ava /></Link></li>
    <li className={styles.navlist}><SignOutButton /></li>

  </ul>);

const NavigationNonAuth = () => (
        <ul>
            <li className={styles.navlist}><Link to={routes.SIGN_IN}></Link></li>
        </ul>
);


export default Navigation;
