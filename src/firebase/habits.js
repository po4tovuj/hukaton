import {habitsDbRef} from './firebase';

export const writeHabitData = (userId, habit) => {
    let habitId = habitsDbRef.child(userId + '/' + habit.category).push().key;

    let newHabit = {
        ...habit,
        habitId,
    };

    return habitsDbRef
        .child(userId + '/' + habit.category + '/' + habitId)
        .set(newHabit)
        .then(() => {
            habitsDbRef.child(userId + '/habitsCounter').once('value', snapshot => {
                const counter = snapshot.val();
                let categoryCount = counter[habit.category];
                habitsDbRef
                    .child(userId + '/habitsCounter')
                    .set({
                        ...counter,
                        [habit.category]: ++categoryCount,
                    });
            });
        })
        .catch(err => console.log(err));
};

export const deleteHabitData = (userId, category, habitId) => {
    habitsDbRef
        .child(userId + '/' + habitId)
        .remove()
        .then(() => {
            habitsDbRef.child(userId + '/habitsCounter').once('value', snapshot => {
                const counter = snapshot.val();
                let categoryCount = counter[category];
                habitsDbRef
                    .child(userId + '/habitsCounter')
                    .set({
                        ...counter,
                        [category]: --categoryCount,
                    });
            });
        })
        .catch(err => console.log(err));
};

export const updateHabitData = (userId, category, habitId, updatedData) => {
    return habitsDbRef.child(userId + '/' + category + '/' + habitId).update(updatedData);
};

export const getDataByCategory = (userId, category) => {
    habitsDbRef.child(userId + '/' + category).once('value', snap => {
        console.log('answer in firebase => ', snap.val());

        return snap.val();
    });
};

export const getAllAndJoin = userId => habitsDbRef.child(userId).once('value', snap => {

   return snap.val();
});

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
//
// console.log(Object.values(habits));
//
// const x = Object.values(habits).reduce((acc, cur) => {
//   return { ...acc, ...cur };
// }, {});
//
// console.log(x);
