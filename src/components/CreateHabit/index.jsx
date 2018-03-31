import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import styles from './styles.css';
import CategoryItem from '../CategoryItem';

import family from '../../images/icon-20.svg';
import health from '../../images/icon-28.svg';
import self from '../../images/icon-22.svg';
import hobbys from '../../images/icon-23.svg';
import enviroment from '../../images/icon-27.svg';
import finance from '../../images/icon-26.svg';
import carier from '../../images/icon-25.svg';
import voyage from '../../images/icon-24.svg';

ReactModal.setAppElement('#root');

export default class CreateHabit extends Component {
    constructor () {
   super();
   this.state = {
     showModal: false
   };

   this.handleOpenModal = this.handleOpenModal.bind(this);
   this.handleCloseModal = this.handleCloseModal.bind(this);
 }

 handleOpenModal () {
   this.setState({ showModal: true });
 }

 handleCloseModal () {
   this.setState({ showModal: false });
 }

 render () {
     const habitsCategories = [
        {
            categoryName: 'Семья',
            icon: family
        },
        {
            categoryName: 'Здоровье',
            icon: health
        },
        {
            categoryName: 'Саморазвитие',
            icon: self
        },
        {
            categoryName: 'Досуг',
            icon: hobbys
        },
        {
            categoryName: 'Окружение',
            icon: enviroment
        },
        {
            categoryName: 'Финансы',
            icon: finance
        },
        {
            categoryName: 'Карьера',
            icon: carier
        },
        {
            categoryName: 'Путешевствия',
            icon: voyage
        }
    ];
   return (
     <div className={styles.CreateHabit}>
       <button onClick={this.handleOpenModal}>Trigger Modal</button>
       <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className={styles.Modal}
          overlayClassName={styles.Overlay}
       >
         <h4 className={styles.header}>Новая привычка</h4>
         <form className={styles.form}>
             <input className={styles.input} placeholder="Название" />
             <div className={styles.categoryWrapper}>
                 {habitsCategories.map(item => (
                     <div className={styles.categoryItem} key={item.categoryName}>
                          <CategoryItem categoryName={item.categoryName} icon={item.icon} />
                      </div>
                 ))}
             </div>

         </form>
         <button onClick={this.handleCloseModal}>Close Modal</button>
       </ReactModal>
     </div>
   );
 }
}

const props = {};
