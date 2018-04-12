import React from 'react';
import CategoryItem from '../CategoryItem';

const CategoriesList = ({
  habitsCategories,
  styles,
  currentCategory,
  checkCategory,
}) => (
  <div className={styles.categoryWrapper}>
    {habitsCategories.map(item => (
      <div className={styles.categoryItem} key={item.categoryName}>
        <CategoryItem
          item={item}
          // FIXME: вместо магических селекторов и стилей, просто
          // проверяем проп active, если текущая категория совпадает
          // с категорией CategoryItem то будет true
          active={item.category === currentCategory}
          checkCategory={checkCategory}
        />
      </div>
    ))}
  </div>
);

export default CategoriesList;
