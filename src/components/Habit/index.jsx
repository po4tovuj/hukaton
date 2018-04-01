import React, {Component} from 'react';
import styles from './styles.css';
import { calcDay, normalizeDate } from '../DateField';

export default class Habit extends Component {

    // state = {
    //     dayHabitState: this.props.dayHabitState,
    //     habitsDone: this.props.habitsDone,
    // };

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
            this.props.dayHabitState[checked.getDay()] ? style =[...style, styles.sign__todo] : style =[...style, styles.sign__none];
            let index = style.includes(styles.sign__todo);

            if(checked<day && index>0 && this.props.habitsDone[normalizeDate(checked)]) {
                style = style.slice(0, 1);
                style = [...style, styles.sign__done];
            } else if (checked<day && index>0 && !this.props.habitsDone[normalizeDate(checked)]){
                style = style.slice(0, 1);
                style = [...style, styles.sign__not_done];
            }
            return style.join(' ');
        };

console.log('aaaaaa', this.props.dayHabitState);

        return (
            <div className={styles.wrapper}>
                <div className={styles.number}> {this. props.index + 1} </div>
                <div className={styles.title}>{this.props.title}</div>
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
