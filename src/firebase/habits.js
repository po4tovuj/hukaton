import {habitsDbRef} from './firebase';

export const writeHabitData = (userId,
                               habit) => {

    let categoryIndex = Object.values(habit.category).filter((item, index) => {return item===true && index});
    let category = Object.keys(habit.category)[categoryIndex];
    console.log('category to base: ', category);

    let habitId = habitsDbRef.child(userId + '/' + category).push().key;

    let newHabit = {
        ...habit,
        habitId,
    };
    console.log('habit.category: ', habit.category);

    return habitsDbRef.child(userId + '/' + category + '/' + habitId).set(newHabit);
};

export const deleteHabitData = (userId, habitId) => {
    habitsDbRef
        .child(userId + '/' + habitId)
        .remove()
        .catch(err => console.log(err));
};

export const updateHabitData = (userId, habitId, updatedData) => {
    return habitsDbRef.child(userId + '/' + habitId).update(updatedData);
};

export const getDataByCategory = (userId, category) => {
    habitsDbRef.child(userId + '/' + category).once('value', snap => {
        return snap && snap.val() || {};
    });
};

// export const getAllAndJoin = userId =>
//   habitsDbRef.child(userId).once('value', snap => {
//     return Object.values(snap.val()).reduce((acc, cur) => {
//       return { ...acc, ...cur };
//     }, {});
//   });

// const habits = {
//   sport: {
//     '00': {
//       hab: 1,
//     },
//     '01': {
//       hab: 2,
//     },
//   },
//   life: {
//     '02': {
//       hab: 3,
//     },
//     '03': {
//       hab: 4,
//     },
//   },
//   health: {
//     '04': {
//       hab: 5,
//     },
//     '05': {
//       hab: 6,
//     },
//   },
// };

// console.log(Object.values(habits));

// const x = Object.values(habits).reduce((acc, cur) => {
//   return { ...acc, ...cur };
// }, {});

// console.log(x);
