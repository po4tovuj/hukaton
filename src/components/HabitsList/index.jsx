import React from 'react';
import {HabitContext} from '../App';
import Habit from "../Habit";
import {deleteHabitData} from "../../firebase";
import DateField from "../DateField";

const HabitsList = () => (

    <HabitContext.Consumer>
        {({ userId, habitsList }) =>(
            <div>
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

export default HabitsList;
