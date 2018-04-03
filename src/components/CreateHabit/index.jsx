import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles.css';
import CategoryItem from '../CategoryItem';
import DaysList from '../DaysList';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {auth, db} from "../../firebase";

// let userid = auth.currentUser.uid;
// let userid = "hsgdvgwsyfgywfgywgfey";
ReactModal.setAppElement('#root');
const initialState = {
    title: '',
    category: '',
    startDate: moment(),
    rememberTime: moment(),
    customDays: false,
    duration: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        0: false
    }
};

export default class CreateHabit extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            category: '',
            startDate: moment(),
            rememberTime: moment(),
            customDays: false,
            duration: {
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                0: false
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
    }

    handleChange(date) {
        this.setState({startDate: date});
        console.log(this.state.startDate);
    }
    handleChangeTime(date) {
        this.setState({rememberTime: date});
        console.log(this.state.startDate);
    }

    handleChangeTitle = (evt) => {
        const value = evt.target.value;
        this.setState({title: value});
    };

    checkCategory = (currentCatID, category, btnCategoryStyle, btnActive) => {
      this.setState({category: category},
      () => {
        let btnsCategory = document.querySelectorAll(`.${btnCategoryStyle}`);
        for (let i = 0; i < btnsCategory.length; i++ ) {
          if (btnsCategory[i].id === currentCatID) {
            btnsCategory[i].classList.toggle(btnActive);
          } else if (btnsCategory[i].classList.contains(btnActive)) {
            btnsCategory[i].classList.remove(btnActive);
          }
        }
      });
    };

    getDuration = (evt) => {
        console.log(evt.target.value);

        switch (evt.target.value) {
            case "workDays":
                this.setState({
                    duration: {
                        1: true,
                        2: true,
                        3: true,
                        4: true,
                        5: true,
                        6: false,
                        0: false
                    },
                    customDays: false,
                });
                break;
            case "holydays":
                this.setState({
                    duration: {
                        1: false,
                        2: false,
                        3: false,
                        4: false,
                        5: false,
                        6: true,
                        0: true
                    },
                    customDays: false,
                });
                break;
            case "everyday":
                this.setState({
                    duration: {
                        1: true,
                        2: true,
                        3: true,
                        4: true,
                        5: true,
                        6: true,
                        0: true
                    },
                    customDays: false,
                });
                break;
            case "customDays":
                this.setState({customDays: true});
                break;
        };
        console.log(this.state.duration);
    }

    selectDay = (day) => {
        const dayId = day.slice(3);
        const curDur = this.state.duration;
        console.log(curDur);
        switch(dayId){
            case "0":
            this.setState(prevState => ({
                       duration: { ...prevState.duration, 0: !curDur[0] }
                   }));
            break;
            case "1":
            this.setState(prevState => ({
                       duration: { ...prevState.duration, 1: !curDur[1] }
                   }));
            break;
            case "2":
            this.setState(prevState => ({
                       duration: { ...prevState.duration, 2: !curDur[2] }
                   }));
            break;
            case "3":
            this.setState(prevState => ({
                       duration: { ...prevState.duration, 3: !curDur[3] }
                   }));
            break;
            case "4":
            this.setState(prevState => ({
                       duration: { ...prevState.duration, 4: !curDur[4] }
                   }));
            break;
            case "5":
            this.setState(prevState => ({
                       duration: { ...prevState.duration, 5: !curDur[5] }
                   }));
            break;
            case "6":
            this.setState(prevState => ({
                       duration: { ...prevState.duration, 6: !curDur[6] }
                   }));
            break;

        };
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        if (!evt.target.checkValidity()) {
            console.log(`Not enoth data`);
            // form is invalid! so we do nothing
        return;
        }
        const { title, category, startDate, rememberTime, duration } = this.state;
        // form is valid! We can parse and submit data
        const newHabit = {
            title: title,
            category: category,
            startDate: '01.04.2018',
            rememberTime: '04.04.2018',
            duration: duration
        }
        console.log('Go fetch to Base', newHabit);
        console.log(auth.currentUser.uid);

        function addHabits(userid, habit) {
          db.ref().child("habits").child(`${userid}`).push(habit).catch(err => console.log(err));
          // console.log(habit)
        }

        addHabits(auth.currentUser.uid, newHabit);
        this.setState(initialState, () => (console.log(`ClearState`, this.state)));
        this.props.handleCloseModal();
    }

    render() {
        const habitsCategories = [
            {
                category: 'family',
                categoryId: 0,
                categoryName: 'Семья',
            }, {
                category: 'health',
                categoryId: 1,
                categoryName: 'Здоровье',
            }, {
                category: 'self',
                categoryId: 2,
                categoryName: 'Саморазвитие',
            }, {
                category: 'hobbys',
                categoryId: 3,
                categoryName: 'Досуг',
            }, {
                category: 'environment',
                categoryId: 4,
                categoryName: 'Окружение',
            }, {
                category: 'finance',
                categoryId: 5,
                categoryName: 'Финансы',
            }, {
                category: 'carier',
                categoryId: 6,
                categoryName: 'Карьера',
            }, {
                category: 'voyage',
                categoryId: 7,
                categoryName: 'Путешевствия',
            }
        ];

        return (<div className={styles.CreateHabit}>

            <ReactModal isOpen={this.props.showModal} contentLabel="onRequestClose Example"  shouldCloseOnOverlayClick={false} className={styles.Modal} overlayClassName={styles.Overlay}>
                <button className={styles.closeBtn} onClick={this.props.handleCloseModal}>X</button>
                <h4 className={styles.header}>Новая привычка</h4>
                <form className={styles.form} noValidate onSubmit={this.handleSubmit} >
                    <input className={styles.input} id="title" placeholder="Название" required onChange={this.handleChangeTitle} />
                    <div className={styles.categoryWrapper}>
                        {
                            habitsCategories.map(item => (<div className={styles.categoryItem} key={item.categoryName}>
                                <CategoryItem item={item} checkCategory={this.checkCategory} />
                            </div>))
                        }
                    </div>
                    <label className={styles.label}>Начало привычки
                        <DatePicker
                          selected={this.state.startDate}
                          onChange={this.handleChange}
                          dateFormat="L"
                          locale="ru"
                          required />
                    </label>
                    {this.state.customDays && <DaysList selectDay={this.selectDay} />}
                    <label className={styles.label}>
                        Напоминания
                        <select className={styles.select} onChange={this.getDuration} required>
                            <option className={styles.option} value="workDays">Рабочие дни</option>
                            <option className={styles.option} value="holydays">Выходные дни</option>
                            <option className={styles.option} value="everyday">Ежедневно</option>
                            <option className={styles.option} value="customDays">Выбрать дни</option>
                        </select>
                    </label>
                    <label className={styles.label}>
                        Время Напоминаний
                        <DatePicker
                            selected={this.state.rememberTime}
                            onChange={this.handleChangeTime}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            dateFormat="LT"
                            timeCaption="Время"
                            locale="ru"
                            required
                        />
                    </label>
                    <button type="submit" className={styles.btnSubmit}>Сохранить</button>
                </form>
            </ReactModal>
        </div>);
    }
}

const props = {};
