import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.css';


const Header = () => (
  <header>
    <nav>
      <div>
        <a href="/" className={styles}>
          <img alt="" />
        </a>
        <ul id="nav-mobile" className={styles}>
          <li>
            <NavLink exact to="/" className={styles} activeClassName={styles} >
              Habits
            </NavLink>
            <button> Logout </button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);


export default Header;
