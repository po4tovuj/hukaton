import {habitsDbRef} from './firebase';

export const writeHabitData = (userId,
                               habit) => {
    let habitId = habitsDbRef.child(userId + '/' + habit.category).push().key;

    let newHabit = {
        ...habit,
        habitId,
        // habitsDone: {"0904": true},
    };

    return habitsDbRef.child(userId + '/' + habit.category + '/' + habitId).set(newHabit);
};
export const deleteHabitData = (userId, habitId) => {
    habitsDbRef
        .child(userId + '/' + habitId)
        .remove()
        .catch(err => console.log(err));
};

export const updateHabitData = (userId, category, habitId, updatedData) => {
    return habitsDbRef.child(userId + '/' + category + '/' + habitId).update(updatedData);
};

export const getDataByCategory = (userId, category) => {
    habitsDbRef.child(userId + '/' + category).once('value', snap => {
        // console.log('category => ', category, ' => ', snap.val());
        return snap.val();
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
