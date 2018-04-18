import React from 'react';
import { NavLink } from 'react-router-dom';

const CategoriesList = ({
  categories,
  styles,
  onCategoryClick,
  match,
  habitsCounter,
}) => (
  <ul className={styles.category__wrapper}>
    {categories.map(category => (
      <li
        key={category.name}
        className={styles.category__item}
        onClick={() => onCategoryClick(category.name)}>
        <NavLink
          to={{
            pathname: `${match.url}`,
            search: `?category=${category.name}`,
          }}>
          # {category.text}
        </NavLink>
        <span className={styles.counter}>{habitsCounter[category.name]}</span>
      </li>
    ))}
  </ul>
);

export default CategoriesList;
