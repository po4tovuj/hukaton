import { habitsDbRef, auth } from './firebase';

export const writeHabitData = (
  userId,
  title,
  category,
  duration,
  startTime,
  timeForRemember,
  habitsDone,
) => {
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

  return habitsDbRef.child(userId + '/' + newHabitKey).set(newHabit);
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

export const getAllAndJoin = userId =>
  habitsDbRef.child(userId).once('value', snap => {
    return Object.values(snap.val()).reduce((acc, cur) => {
      return { ...acc, ...cur };
    }, {});
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

// console.log(Object.values(habits));

// const x = Object.values(habits).reduce((acc, cur) => {
//   return { ...acc, ...cur };
// }, {});

// console.log(x);
