import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles.css';
import CategoryItem from '../CategoryItem';
import DaysList from '../DaysList';

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
     title: '',
     category: {
         family: false,
         health: false,
         self: false,
         hobby: false,
         environment: false,
         finance: false,
         carier: false,
         voyage: false
     },
     startDate: moment(),
     rememberTime: moment(),
     customDays: false,
     duration: {
       mon: false,
       tue: false,
       wed: false,
       thu: false,
       fri: false,
       sat: false,
       sun: false
     },
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
     console.log(this.state.startDate);
   }
   handleChangeTime(date) {
       this.setState({
         rememberTime: date
       });
       console.log(this.state.startDate);
     }

    handleChangeTitle = (evt) => {
        const value = evt.target.value;
        this.setState({
            title: value
        }
    );
    };

    checkCategory = (category, btnActive) => {
        console.log(category);
        const btn = document.getElementById(category);
        btn.classList.toggle(btnActive);
        const currentcategory = this.state.category;
        for (let key in currentcategory) {
            currentcategory[key] = key === category ?
                currentcategory[key] === false ?
                    true : false
                    : false;
        };
        console.log(currentcategory);
        this.setState({
            category: currentcategory
        }
    );
};

getDuration = (evt) => {
    console.log(evt.target.value);

    switch (evt.target.value) {
        case "workDays":
            this.setState({
                duration: {
                    mon: true,
                    tue: true,
                    wed: true,
                    thu: true,
                    fri: true,
                    sat: false,
                    sun: false},
            });
          break;
        case "holydays":
        this.setState({
            duration: {
                  mon: false,
                  tue: false,
                  wed: false,
                  thu: false,
                  fri: false,
                  sat: true,
                  sun: true }
              });
      break;
      case "everyday":
      this.setState({
          duration: {
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
        sun: true }
    });
    break;
    case "customDays":
    this.setState({
        customDays: true,
  });break;
};
console.log(this.state.duration);
}

 render () {
     const habitsCategories = [
        {
            categoryId: 'family',
            categoryName: 'Семья',
            icon: family
        },
        {
            categoryId: 'health',
            categoryName: 'Здоровье',
            icon: health
        },
        {
            categoryId: 'self',
            categoryName: 'Саморазвитие',
            icon: self
        },
        {
            categoryId: 'hobby',
            categoryName: 'Досуг',
            icon: hobbys
        },
        {
            categoryId: 'environment',
            categoryName: 'Окружение',
            icon: enviroment
        },
        {
            categoryId: 'finance',
            categoryName: 'Финансы',
            icon: finance
        },
        {
            categoryId: 'carier',
            categoryName: 'Карьера',
            icon: carier
        },
        {
            categoryId: 'voyage',
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
             <input className={styles.input} id="title" placeholder="Название" />
             <div className={styles.categoryWrapper}>
                 {habitsCategories.map(item => (
                     <div className={styles.categoryItem} key={item.categoryName}>
                          <CategoryItem categoryName={item.categoryName} icon={item.icon} checkCategory={this.checkCategory} categoryId={item.categoryId} />
                      </div>
                 ))}

             </div>
             <label className={styles.label}>Начало привычки
                 <DatePicker selected={this.state.startDate} onChange={this.handleChange} />
             </label>
            {this.state.customDays && <DaysList />}
             <label className={styles.label}>
                 Напоминания
                 <select className={styles.select} onChange={this.getDuration}>
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
                        onChange={this.handleChangeTime}
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
