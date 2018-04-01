import React, { Component, Fragment } from 'react'
import Habit from "../Habit";
import DateField from "../DateField";

export default class List extends Component {
  render() {
    const category = this.props.match.params.category;
    const categoryHabits = category !== 'all'
      ? this.props.habits.filter((item) => item.category === category)
      : this.props.habits.filter((item) => item)
    console.log('categoryHabits: ', categoryHabits);
    console.log('qwerwer', this.props);
    return (
      <div>
        <DateField />
        {categoryHabits.map((item, index) => (
            <Habit key={item.title} index={index} title={item.title} dayHabitState={item.duration} habitsDone={item.habitsDone} />
        ))}
      </div>
    )
  }
}
