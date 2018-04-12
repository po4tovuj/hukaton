import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';
import { Ava } from '../Avatar';
import HomeBtn from '../HomeButton';
import { HabitContext } from '../App';

const Navigation = () => (
  <HabitContext.Consumer>
    {({ isAuth, onSignOut }) =>
      isAuth ? <NavigationAuth onSignOut={onSignOut} /> : <NavigationNonAuth />
    }
  </HabitContext.Consumer>
);

const NavigationAuth = ({ onSignOut }) => (
  <ul className={styles.ul}>
    <li className={styles.navlist}>
      <HomeBtn />
    </li>
    <li className={styles.navlist}>
      <Link to={routes.ACCOUNT}>
        <Ava />
      </Link>
    </li>
    <li className={styles.navlist}>
      <SignOutButton onSignOut={onSignOut} />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li className={styles.navlist}>
      <Link to={routes.SIGN_IN} />
    </li>
  </ul>
);

export default Navigation;
