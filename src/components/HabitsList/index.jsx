import React from 'react';
import { HabitContext } from '../App';
import Habit from '../Habit';
import DateField from '../DateField';
import { deleteHabitData } from '../../firebase';
import style from './styles.css';

const HabitsList = ({ habitsList }) => {
  return (
    <HabitContext.Consumer>
      {({ userId }) => (
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
