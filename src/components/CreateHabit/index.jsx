import React, {Component} from 'react';
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
const initialState = {
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
            datePicDate:moment(),
            datePicTime:moment(),
            startDate: '',
            rememberTime: '',
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
    // dur = this.state.duration;

    handleChange(date) {

        this.setState({datePicDate: date, startDate: date.format("MMM Do YY")});
        console.log(this.state.startDate);
    }
    handleChangeTime(date) {
        this.setState({datePicTime: date, rememberTime: date.format('MMMM Do YYYY, h:mm:ss a')});
        console.log(this.state.startDate);
    }

    handleChangeTitle = (evt) => {
        const value = evt.target.value;
        this.setState({title: value});
    };

    checkCategory = (category, btnActive) => {
        console.log(category);
        const currentcategory = this.state.category;
        for (let key in currentcategory) {
            currentcategory[key] = key === category
                ? currentcategory[key] === false
                    ? true
                    : false
                : false;
        };
        console.log(currentcategory);
        this.setState({category: currentcategory},
        () => {
            for (let key in currentcategory) {
                const btn = document.getElementById(key);
                if (currentcategory[key]) {
                    btn.classList.add(btnActive);
                } else if (btn.classList.contains(btnActive)) {
                    btn.classList.remove(btnActive);
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
            startDate: startDate,
            rememberTime: rememberTime,
            duration: duration
        }
        console.log('Go fetch to Base', newHabit);
        this.setState(initialState, () => (console.log(`ClearState`, this.state)));
        this.props.handleCloseModal();
    }

    render() {
        const habitsCategories = [
            {
                categoryId: 'family',
                categoryName: 'Семья',
                icon: family
            }, {
                categoryId: 'health',
                categoryName: 'Здоровье',
                icon: health
            }, {
                categoryId: 'self',
                categoryName: 'Саморазвитие',
                icon: self
            }, {
                categoryId: 'hobby',
                categoryName: 'Досуг',
                icon: hobbys
            }, {
                categoryId: 'environment',
                categoryName: 'Окружение',
                icon: enviroment
            }, {
                categoryId: 'finance',
                categoryName: 'Финансы',
                icon: finance
            }, {
                categoryId: 'carier',
                categoryName: 'Карьера',
                icon: carier
            }, {
                categoryId: 'voyage',
                categoryName: 'Путешевствия',
                icon: voyage
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
                                <CategoryItem categoryName={item.categoryName} icon={item.icon} checkCategory={this.checkCategory} categoryId={item.categoryId} />
                            </div>))
                        }

                    </div>
                    <label className={styles.label}>Начало привычки
                        <DatePicker selected={this.state.datePicDate} onChange={this.handleChange} required />
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
                            selected={this.state.datePicTime}
                            onChange={this.handleChangeTime}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            dateFormat="LT"
                            timeCaption="Time"
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
