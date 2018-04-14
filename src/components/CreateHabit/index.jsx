import React, { Component } from 'react';
import ReactModal from 'react-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { auth, writeHabitData } from '../../firebase';
import CategoriesList from './CategoriesList';
import DaysList from '../DaysList';
import styles from './styles.css';

// let userid = auth.currentUser.uid;
// let userid = "hsgdvgwsyfgywfgywgfey";
ReactModal.setAppElement('#root');

const initialState = {
  title: '',
  category: '',
  startDate: '',
  rememberTime: '',
  customDays: false,
  duration: {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '0': false,
  },
};

export default class CreateHabit extends Component {
  state = {
    title: '',
    category: '',
    startDate: '',
    rememberTime: '',
    datePickerStartDate: moment(),
    datePickerStartTime: moment(),
    customDays: false,
    duration: {
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      '5': false,
      '6': false,
      '0': false,
    },
  };

  handleChange = date => {
    const start = date.format('LL');
    console.log(start);
    const startInMsec = Date.parse(start);
    console.log(startInMsec);
    this.setState({ datePickerStartDate: date, startDate: startInMsec }, () =>
      console.log(this.state.startDate),
    );
  };

  handleChangeTime = date => {
    const startTime = date.format('HH mm');
    console.log(startTime);
    this.setState({ datePickerStartTime: date, rememberTime: startTime });
    console.log(this.state.rememberTime);
  };

  handleChangeTitle = evt => {
    const value = evt.target.value;
    this.setState({ title: value });
  };

  checkCategory = (currentCatID, category, btnCategoryStyle, btnActive) => {
    this.setState({ category }, () => {
      let btnsCategory = document.querySelectorAll(`.${btnCategoryStyle}`);

      for (let i = 0; i < btnsCategory.length; i++) {
        if (btnsCategory[i].id === currentCatID) {
          btnsCategory[i].classList.toggle(btnActive);
        } else if (btnsCategory[i].classList.contains(btnActive)) {
          btnsCategory[i].classList.remove(btnActive);
        }
      }
    });
  };

  getDuration = evt => {
    console.log(evt.target.value);
    const prevDuration = { ...this.state.duration };
    let selectDays = false;

    // TODO: подумать над утилитой для записи стейта ключей
    switch (evt.target.value) {
      case 'workDays':
        for (let key in prevDuration) {
          prevDuration[key] = key === '0' || key === '6' ? false : true;
        }
        break;

      case 'holydays':
        for (let key in prevDuration) {
          prevDuration[key] = key === '0' || key === '6' ? true : false;
        }
        break;

      case 'everyday':
        for (let key in prevDuration) {
          prevDuration[key] = true;
        }
        break;

      case 'customDays':
        for (let key in prevDuration) {
          prevDuration[key] = false;
        }
        selectDays = true;
        break;

      default:
        console.log('default case');
        break;
    }

    this.setState({ customDays: selectDays, duration: prevDuration }, () =>
      console.log(this.state.duration),
    );
  };

  selectDay = day => {
    const dayId = day.slice(3);
    const currentDuration = this.state.duration;
    for (let key in currentDuration) {
      if (key === dayId) {
        currentDuration[key] = !currentDuration[key];
      }
    }
    this.setState(prevState => ({ duration: currentDuration }));
  };

  handleSubmit = evt => {
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
      duration: duration,
    };
    console.log('Go fetch to Base', newHabit);
    console.log(auth.currentUser.uid);

    writeHabitData(auth.currentUser.uid, newHabit);
    this.setState(initialState, () => console.log(`ClearState`, this.state));
    this.props.handleCloseModal();
    this.props.onCategoryClick(category);
  };

  render() {
    const habitsCategories = [
      {
        category: 'family',
        categoryId: 0,
        categoryName: 'Семья',
      },
      {
        category: 'health',
        categoryId: 1,
        categoryName: 'Здоровье',
      },
      {
        category: 'self-development',
        categoryId: 2,
        categoryName: 'Саморазвитие',
      },
      {
        category: 'hobbys',
        categoryId: 3,
        categoryName: 'Досуг',
      },
      {
        category: 'environment',
        categoryId: 4,
        categoryName: 'Окружение',
      },
      {
        category: 'finance',
        categoryId: 5,
        categoryName: 'Финансы',
      },
      {
        category: 'carrier',
        categoryId: 6,
        categoryName: 'Карьера',
      },
      {
        category: 'voyage',
        categoryId: 7,
        categoryName: 'Путешевствия',
      },
    ];

    return (
      <div className={styles.CreateHabit}>
        <ReactModal
          isOpen={this.props.showModal}
          contentLabel="onRequestClose Example"
          shouldCloseOnOverlayClick={false}
          className={styles.Modal}
          overlayClassName={styles.Overlay}>
          <button
            className={styles.closeBtn}
            onClick={this.props.handleCloseModal}>
            X
          </button>
          <h4 className={styles.header}>Новая привычка</h4>

          <form className={styles.form} noValidate onSubmit={this.handleSubmit}>
            <input
              className={styles.input}
              id="title"
              placeholder="Название"
              required
              onChange={this.handleChangeTitle}
            />
            <CategoriesList
              habitsCategories={habitsCategories}
              styles={styles}
              currentCategory={this.state.category}
              checkCategory={this.checkCategory}
            />
            <label className={styles.label}>
              Начало привычки
              <DatePicker
                selected={this.state.datePickerStartDate}
                onChange={this.handleChange}
                locale="en-gb"
                placeholderText="Weeks start on Monday"
              />
            </label>
            {this.state.customDays && <DaysList selectDay={this.selectDay} />}
            <label className={styles.label}>
              Напоминания
              <select
                className={styles.select}
                onChange={this.getDuration}
                required>
                <option className={styles.option} value="workDays">
                  Рабочие дни
                </option>
                <option className={styles.option} value="holydays">
                  Выходные дни
                </option>
                <option className={styles.option} value="everyday">
                  Ежедневно
                </option>
                <option className={styles.option} value="customDays">
                  Выбрать дни
                </option>
              </select>
            </label>
            <label className={styles.label}>
              Время Напоминаний
              <DatePicker
                selected={this.state.datePickerStartTime}
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
            <button type="submit" className={styles.btnSubmit}>
              Сохранить
            </button>
          </form>
        </ReactModal>
      </div>
    );
  }
}
