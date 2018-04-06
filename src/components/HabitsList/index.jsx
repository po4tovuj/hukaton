import React, { Component } from 'react';
import {
  auth,
  deleteHabitData,
  doSignOut,
  habitsDbRef,
  getAllAndJoin,
} from '../../firebase';
import Habit from '../Habit';

class HabitsList extends Component {
  state = {
    habitsList: null,
  };

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.getHabits();
        getAllAndJoin(user.uid);
      } else {
        doSignOut();
      }
    });
  }

  initOnceOnValueListener = () => {
    habitsDbRef.child(this.props.userId).once('value', snapshot => {
      snapshot.val() && this.setState({ habitsList: snapshot.val() });
    });
  };

  initChildAddedListener = () => {
    habitsDbRef
      .child(this.props.userId)
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
    habitsDbRef.child(this.props.userId).on('child_removed', snapshot => {
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

  render() {
    const { habitsList } = this.state;
    const { userId } = this.props;

    return (
      <div>
        UserID={userId}
        <br />
        {habitsList &&
          Object.values(habitsList).map((habitObj, index) => (
            <Habit
              key={habitObj.habitId}
              index={index}
              userID={userId}
              {...habitObj}
              id={habitObj.habitId}
              dayHabitState={habitObj.duration}
              onDelete={deleteHabitData}
            />
          ))}
      </div>
    );
  }
}

export default HabitsList;
