import React, {Component} from 'react';
import {calcDay} from '../DateField';
import {auth, habitsDbRef} from "../../firebase";
import styles from './styles.css';

export default class Habit extends Component {

    state = {
        habitWasDone: false,
    };

    componentDidMount() {
        let today = new Date().setHours(0, 0, 0, 0);
        let habitsDone = this.props.habitObj.habitsDone;

        habitsDone && this.setState({
            habitWasDone: habitsDone[today],
        });
    }

    render() {
        const {index, id, habitObj, onDelete} = this.props;
        const {habitId, title, category, duration, habitsDone, startDate} = habitObj;

        let today = new Date();
        let yesterday = calcDay(today, -1);
        let beforeYesterday = calcDay(today, -2);
        let tomorrow = calcDay(today, +1);
        let afterTomorrow = calcDay(today, +2);


        const handleClick = () => {
            if (duration && duration[today.getDay()]) {
                habitsDbRef.child(auth.currentUser.uid + '/' + category + '/' + habitId + '/habitsDone')
                    .set({
                        ...habitsDone,
                        [today.setHours(0, 0, 0, 0)]: !this.state.habitWasDone,
                    })
                    .then(() => {
                        this.setState(prevState => {
                            return {
                                habitWasDone: !prevState.habitWasDone,
                            }
                        });
                    });
            }
        };

        const handleBasketClick = (evt) => {
            evt.target.classList.toggle(styles.basket__orange);
            onDelete(auth.currentUser.uid, category + '/' + evt.target.id);
        };

        const handleIconStyle = (checkedDate) => {
            let iconStyle = [];
            iconStyle = [...iconStyle, styles.sign];

            let habitShouldDo = startDate <= Date.parse(checkedDate) && duration && duration[checkedDate.getDay()]
                ? true
                : false;

            let habitWasMade = habitsDone && habitsDone[checkedDate.setHours(0, 0, 0, 0)];

            if (habitShouldDo) {
                if (checkedDate < today.setHours(0, 0, 0, 0)) {
                    iconStyle = habitShouldDo && habitWasMade
                        ? [...iconStyle, styles.sign__done]
                        : [...iconStyle, styles.sign__not_done]
                } else {
                    if (checkedDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
                        iconStyle = this.state.habitWasDone
                            ? [...iconStyle, styles.sign__done]
                            : [...iconStyle, styles.sign__todo];
                    } else {
                        iconStyle = [...iconStyle, styles.sign__todo];
                    }
                }
            } else {
                iconStyle = [...iconStyle, styles.sign__none];
            }

            return iconStyle.join(' ');
        };

        return (
            <div className={styles.wrapper}>
                <div className={styles.number}> {index + 1} </div>
                <div className={styles.title}>{title}</div>
                <div className={handleIconStyle(beforeYesterday)}></div>
                <div className={handleIconStyle(yesterday)}></div>
                <div className={handleIconStyle(today)} onClick={handleClick}></div>
                <div className={handleIconStyle(tomorrow)}></div>
                <div className={handleIconStyle(afterTomorrow)}></div>
                <div className={styles.basket} id={id} onClick={handleBasketClick}></div>
            </div>
        );
    };
}