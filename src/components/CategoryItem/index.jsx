import React from 'react';
import styles from './styles.css';

const CategoryItem = ({ item, active, checkCategory }) => {
  // console.log(active);

  // FIXME: пофиксить логику, заменить просто на active проп вот это
  const handleClick = evt => {
    evt.preventDefault();
    const currentCatID = evt.target.id;
    const btnCategoryStyle = styles.btn;
    const btnActive = styles.btnActive;
    const category = item.category;
    checkCategory(currentCatID, category, btnCategoryStyle, btnActive);
  };
  const btnStyle = `${styles.btn} ${styles[item.category]}`;

  return (
    // TODO: так по условия классы ставить
    // className={active ? styles.btnActive : '..'}
    <div className={styles.item}>
      <button className={btnStyle} onClick={handleClick} id={item.categoryId} />
      <p className={styles.caption}>{item.categoryName}</p>
    </div>
  );
};

export default CategoryItem;
