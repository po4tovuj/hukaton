import React from 'react';
import { HabitContext } from '../App';
import Habit from '../Habit';
import { deleteHabitData } from '../../firebase';
import DateField from '../DateField';
import style from './styles.css';

const HabitsList = props => {
  return (
    <HabitContext.Consumer>
      {({ userId, habitsList }) => (
        <div className={style.wrapper}>
          <DateField />
          {habitsList &&
            Object.values(habitsList).map((habitObj, index) => (
              <Habit
                key={habitObj.habitId}
                index={index}
                userID={userId}
                habitObj={habitObj}
                id={habitObj.habitId}
                onDelete={deleteHabitData}
              />
            ))}
        </div>
      )}
    </HabitContext.Consumer>
  );
};

export default HabitsList;
