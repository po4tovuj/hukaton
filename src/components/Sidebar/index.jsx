import React from 'react';
import { NavLink } from 'react-router-dom';
import CategoriesList from './CategoriesList';
import categories from './categories';
import styles from './styles.css';

// FIXME: счетчик не фурычит и пропы не едут
const Sidebar = ({ match, onGetAllClick, ...rest }) => {
  return (
    <section className={styles.sidebar}>
      <h2 className={styles.title}>Привычки</h2>
      <CategoriesList
        categories={categories}
        styles={styles}
        match={match}
        {...rest}
      />
      <NavLink
        to={{
          pathname: `${match.url}`,
          search: `?category=all`,
        }}>
        <span className={styles.title} onClick={onGetAllClick}>
          Сегодня
        </span>
      </NavLink>
    </section>
  );
};

export default Sidebar;
