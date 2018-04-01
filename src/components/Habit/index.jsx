import React, {Component} from 'react';
import styles from './styles.css';
import { calcDay, normalizeDate } from '../DateField';

export default class Habit extends Component {

    state = {
        dayHabitState: {"1": true, "2": false, "3": true, "4": false, "5": true, "6": true, "0": true},
        habitsDone: {"29.03": true, "30.03": true, "31.03": false},
    };

    handleClick = (evt) => {
        let currentClass;
        if (evt.target.classList[1].slice(0, 18) === "styles__sign__todo") {
            currentClass = evt.target.classList[1];
            evt.target.classList.remove(currentClass);
            evt.target.classList.add(styles.sign__done);
        } else if (evt.target.classList[1] === "styles__sign__done" || evt.target.classList[1].slice(0, 18) === "styles__sign__done") {
            currentClass = evt.target.classList[1];
            evt.target.classList.remove(currentClass);
            evt.target.classList.add(styles.sign__todo);
        }
    };

    handleBasketClick = (evt) => {
        evt.target.classList.toggle(styles.basket__orange);
    };

    render() {
        let day = new Date();
        let today_1 = calcDay(day, -1);
        let today_2 = calcDay(day, -2);
        let today__1 = calcDay(day, +1);
        let today__2 = calcDay(day, +2);

        const handleIconStyle =(checked) =>  {
            let style = [styles.sign];
            this.state.dayHabitState[checked.getDay()] ? style =[...style, styles.sign__todo] : style =[...style, styles.sign__none];
            let index = style.includes(styles.sign__todo);

            if(checked<day && index>0 && this.state.habitsDone[normalizeDate(checked)]) {
                style = style.slice(0, 1);
                style = [...style, styles.sign__done];
            } else if (checked<day && index>0 && !this.state.habitsDone[normalizeDate(checked)]){
                style = style.slice(0, 1);
                style = [...style, styles.sign__not_done];
            }
            return style.join(' ');
        };



        return (
            <div className={styles.wrapper}>
                <div className={styles.number}>1.</div>
                <div className={styles.title}>Качать прес</div>
                <div className={handleIconStyle(today_2)}></div>
                <div className={handleIconStyle(today_1)}></div>
                <div className={handleIconStyle(day)} onClick={this.handleClick}></div>
                <div className={handleIconStyle(today__1)}></div>
                <div className={handleIconStyle(today__2)}></div>
                <div className={styles.basket} onClick={this.handleBasketClick}></div>
            </div>
        );
    }
};
