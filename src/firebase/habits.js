import {habitsDbRef, auth} from './firebase';

export const writeHabitData = (userId, title, category, duration, startTime, timeForRemember, habitsDone) => {
    let newHabitKey = habitsDbRef.child(userId).push().key;

    let newHabit = {
        title,
        category,
        duration,
        startTime,
        timeForRemember,
        habitsDone,
        habitId: newHabitKey,
    };
    return habitsDbRef
        .child(userId + '/' + newHabitKey)
        .update(newHabit);
};

export const deleteHabitData = (userId, habitId) => {
    habitsDbRef
        .child(userId + '/' + habitId)
        .remove();
};

export const updateHabitData = (userId, habitId, updatedData) => {
    return habitsDbRef
        .child(userId + '/' + habitId)
        .update(updatedData);
};