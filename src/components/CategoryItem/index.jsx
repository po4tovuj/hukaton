import React from 'react';
import styles from './styles.css';

const CategoryItem = ({ item, checkCategory}) => {
    const handleClick = (evt) => {
        evt.preventDefault();
        const currentCatID = evt.target.id;
        const btnCategoryStyle = styles.btn;
        const btnActive = styles.btnActive;
        const category = item.category;
        checkCategory(currentCatID, category, btnCategoryStyle, btnActive);
    };
    const btnStyle = `${styles.btn} ${styles[item.category]}`;

    return (
      <div className={styles.item} >
        <button className={btnStyle} onClick={handleClick} id={item.categoryId} >
        </button>
        <p className={styles.caption}>{item.categoryName}</p>
      </div>
    )
};

export default CategoryItem;
