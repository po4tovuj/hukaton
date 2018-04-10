import React from 'react';
import {HabitContext} from '../App';
import Habit from "../Habit";
import {deleteHabitData} from "../../firebase";

const HabitsList = () => (

    <HabitContext.Consumer>
        {({ userId, habitsList }) =>(
            <div>
            {habitsList &&
            Object.values(habitsList).map((habitObj, index) => (
            <Habit
            key={habitObj.habitId}
            index={index}
            userID={userId}
            habitsDone={habitObj.habitsDone}
            id={habitObj.habitId}
            dayHabitState={habitObj.duration}
            onDelete={deleteHabitData}
            />
            ))}
        </div>
        )}
    </HabitContext.Consumer>
);

export default HabitsList;
