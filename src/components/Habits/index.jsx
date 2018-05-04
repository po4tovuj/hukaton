import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HabitsList from '../HabitsList';
import Sidebar from '../Sidebar';
import NewHabit from '../NewHabit';
import CreateHabit from '../CreateHabit';
import { HabitContext } from '../App';
import { auth, getAllAndJoin, habitsDbRef } from '../../firebase';
import styles from './styles.css';

// FIXME: не обновляется интерфейс при удалении/добавлении, разобраться почему
const INITIAL_STATE = {
  title: '',
  duration: null,
  category: '',
  startTime: '',
  timeForRemember: '',
  habitsList: null,
  habitsCounter: {
    family: 0,
    health: 0,
    'self-development': 0,
    hobbys: 0,
    environment: 0,
    finance: 0,
    carrier: 0,
    voyage: 0,
  },
};

export default class Habits extends Component {
  state = {
    ...INITIAL_STATE,
    userId: auth.currentUser.uid,
    showModal: false,
    chosenCategory: 'family',
    habitsDone: null,
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  componentDidMount() {
    this.getHabits();
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextState.chosenCategory !== this.state.chosenCategory) {
      this.initOnceOnValueListener();
    }
  }

  createHabitsCounter = () => {
    habitsDbRef.child(this.state.userId + '/habitsCounter').set({
      ...INITIAL_STATE.habitsCounter,
    });
  };

  initOnceOnValueListener = () => {
    const { chosenCategory: category, userId } = this.state;

    habitsDbRef.child(userId + '/habitsCounter').once('value', snapshot => {
      snapshot.val()
        ? this.setState({ habitsCounter: snapshot.val() })
        : this.createHabitsCounter();
    });

    habitsDbRef.child(userId + '/' + category).once('value', snapshot => {
      snapshot.val()
        ? this.setState({ habitsList: snapshot.val() })
        : this.setState({ habitsList: {} });
    });
  };

  initChildAddedListener = () => {
    const { chosenCategory: category, userId } = this.state;

    habitsDbRef
      .child(userId + '/' + category)
      .orderByKey()
      .limitToLast(1)
      .on('child_added', snapshot =>
        this.setState(prevState => ({
          habitsList: {
            ...prevState.habitsList,
            [snapshot.key]: snapshot.val(),
          },
        })),
      );
  };

  initChildRemovedListener = () => {
    const { chosenCategory: category, userId } = this.state;

    habitsDbRef.child(userId + '/' + category).on('child_removed', snapshot => {
      snapshot.val() &&
        this.setState(prevState => {
          const { [snapshot.key]: _, ...rest } = prevState.habitsList;
          return {
            habitsList: rest,
          };
        });
    });
  };

  getHabits = () => {
    this.initOnceOnValueListener();
    this.initChildAddedListener();
    this.initChildRemovedListener();
  };

  onCategoryClick = category => {
    this.setState({
      chosenCategory: category,
    });
  };

  onGetAllClick = () => {
    getAllAndJoin(this.state.userId).then(result => {
      const { habitsCounter: _, ...rest } = result.val();
      const today = new Date();

      const arr = Object.values(rest).reduce(
        (acc, el) => acc.concat(Object.values(el)),
        [],
      );

      const filteredHabitsList = arr.filter(
        habit =>
          habit.startDate <= today.setHours(0, 0, 0, 0) &&
          habit.duration[today.getDay()],
      );

      this.setState({
        habitsList: filteredHabitsList,
      });
    });
  };

  render() {
    const { habitsCounter } = this.state;
    console.log('in Habits.js: ', habitsCounter);

    return (
      <HabitContext.Consumer>
        {({ userId, isAuth }) =>
          isAuth ? (
            <div className={styles.habit}>
              <Sidebar
                {...this.props}
                userId={userId}
                habitsCounter={habitsCounter}
                onCategoryClick={this.onCategoryClick}
                onGetAllClick={this.onGetAllClick}
              />
              <div className={styles.wrapper}>
                <NewHabit handleOpenModal={this.handleOpenModal} />
                {userId && <Route path={`${this.props.match.url}/:category`} />}
                <CreateHabit
                  handleCloseModal={this.handleCloseModal}
                  showModal={this.state.showModal}
                  onCategoryClick={this.onCategoryClick}
                />
                {userId && <HabitsList habitsList={this.state.habitsList} />}
              </div>
            </div>
          ) : null
        }
      </HabitContext.Consumer>
    );
  }
}
