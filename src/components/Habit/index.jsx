import React, { Component } from 'react';
import { calcDay } from '../DateField';
import { auth, habitsDbRef } from '../../firebase';
import styles from './styles.css';

const BasketBtn = ({ cls, onClick, id }) => (
  <button className={cls} onClick={onClick}>
  </button>
);

export default class Habit extends Component {
  state = {
    habitWasDone: false,
    date: {
      today: new Date(),
      yesterday: calcDay(new Date(), -1),
      beforeYesterday: calcDay(new Date(), -2),
      tomorrow: calcDay(new Date(), +1),
      afterTomorrow: calcDay(new Date(), +2),
    },
  };

  componentDidMount() {
    const { date } = this.state;

    date.today.setHours(0, 0, 0, 0);
    let habitsDone = this.props.habitObj.habitsDone;

    if (habitsDone) {
      this.setState({
        habitWasDone: habitsDone[date.today],
      });
    }
  }

  handleBasketClick = evt => {
    const target = evt.target;
    const { id } = this.props;
    const {
      onDelete,
      habitObj: { category },
    } = this.props;

    onDelete(auth.currentUser.uid, category, category + '/' + id);
  };

  handleClick = () => {
    const {
      habitObj: { habitId, category, duration, habitsDone },
    } = this.props;

    const { date, habitWasDone } = this.state;

    if (duration && duration[date.today.getDay()]) {
      habitsDbRef
        .child(`${auth.currentUser.uid}/${category}/${habitId}/habitsDone`)
        .set({
          ...habitsDone,
          [date.today.setHours(0, 0, 0, 0)]: !habitWasDone,
        })
        .then(() => {
          this.setState(prevState => ({
            habitWasDone: !prevState.habitWasDone,
          }));
        });
    }
  };

  handleIconStyle = checkedDate => {
    const {
      habitObj: { duration, habitsDone, startDate },
    } = this.props;

    const { date } = this.state;

    let iconStyle = [styles.sign];

    let habitShouldDo =
      startDate <= Date.parse(checkedDate) &&
      duration &&
      duration[checkedDate.getDay()];

    let habitWasMade =
      habitsDone && habitsDone[checkedDate.setHours(0, 0, 0, 0)];

    if (habitShouldDo) {
      if (checkedDate < date.today.setHours(0, 0, 0, 0)) {
        iconStyle =
          habitShouldDo && habitWasMade
            ? [...iconStyle, styles.sign__done]
            : [...iconStyle, styles.sign__not_done];
      } else {
        if (
          checkedDate.setHours(0, 0, 0, 0) === date.today.setHours(0, 0, 0, 0)
        ) {
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

  render() {
    const {
      index,
      id,
      habitObj: { title },
    } = this.props;

    const {
      date: { today, beforeYesterday, yesterday, tomorrow, afterTomorrow },
    } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.number}>{index + 1}</div>
        <div className={styles.title}>{title}</div>
        <div className={this.handleIconStyle(beforeYesterday)} />
        <div className={this.handleIconStyle(yesterday)} />
        <div
          className={this.handleIconStyle(today)}
          onClick={this.handleClick}
        />
        <div className={this.handleIconStyle(tomorrow)} />
        <div className={this.handleIconStyle(afterTomorrow)} />
        <BasketBtn cls={styles.basket} onClick={this.handleBasketClick} />
        {/* <div
          className={styles.basket}
          id={id}
          onClick={this.handleBasketClick}
        /> */}
      </div>
    );
  }
}
