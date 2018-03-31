import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
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
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

ReactModal.setAppElement('#root');

export default class CreateHabit extends Component {
    constructor () {
   super();
   this.state = {
     showModal: false,
     startDate: moment()
   };

   this.handleOpenModal = this.handleOpenModal.bind(this);
   this.handleCloseModal = this.handleCloseModal.bind(this);
   this.handleChange = this.handleChange.bind(this);
 }

 handleOpenModal () {
   this.setState({ showModal: true });
 }

 handleCloseModal () {
   this.setState({ showModal: false });
 }

 handleChange(date) {
     this.setState({
       startDate: date
     });
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
       <button className={styles.closeBtn} onClick={this.handleCloseModal} >X</button>
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
             <label className={styles.label}>Начало привычки
                 <DatePicker selected={this.state.startDate} onChange={this.handleChange} />
             </label>
             <label className={styles.label}>
                 Напоминания
                 <select className={styles.select}>
                    <option className={styles.option} value="workDays">Рабочие дни</option>
                    <option className={styles.option} value="holydays">Выходные дни</option>
                    <option className={styles.option} value="everyday">Ежедневно</option>
                    <option className={styles.option} value="customDays">Выбрать дни</option>
                </select>
             </label>
             <label className={styles.label}>
                 Время Напоминаний
                 <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        dateFormat="LT"
                        timeCaption="Time"
                    />
             </label>
              <button type="submit" onClick={this.handleSubmit} className={styles.btnSubmit}>Сохранить</button>
         </form>
        </ReactModal>
     </div>
   );
 }
}

const props = {};
