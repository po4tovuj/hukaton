import React from 'react';
import styles from './styles.css';

const CategoryItem = ({categoryName, icon, checkCategory, categoryId }) => {
    const handleClick = (evt) => {
        evt.preventDefault();
        const category = categoryId;
        const btnActive = styles.btnActive;
        checkCategory(category, btnActive);
    };

    return (
<button className={styles.item} onClick={handleClick} id={categoryId} >
            <img src={icon} alt={categoryName} title="Выбрать категорию {categoryName}" className={styles.img} />
            <p className={styles.caption} >{categoryName}</p>
</button>

)};

export default CategoryItem;
