import React, { Component } from 'react';
import {
  auth,
  deleteHabitData,
  doCheckAuth,
  doSignOut,
  updateHabitData,
  writeHabitData,
} from '../../firebase';
import * as routes from '../../constants/routes';
import HabitsList from '../HabitsList';

let INITIAL_STATE = {
  isloading: true,
  userId: null,
  email: '',
  displayName: '',
  title: '',
  duration: {
    '0': false, //Sun
    '1': false, //Mon
    '2': false, //Tue
    '3': false, //Wed
    '4': false, //Thu
    '5': false, //Fri
    '6': false, //Sat
  },
  category: 'family',
  startTime: '',
  timeForRemember: '',
  habitsDone: {},
  habitsList: {},
};

class Home extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isloading: false,
          userId: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        doSignOut();
      }
    });
  }

  onChange = evt => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onSubmit = evt => {
    evt.preventDefault();
    const {
      userId,
      title,
      category,
      duration,
      startTime,
      timeForRemember,
      habitsDone,
    } = this.state;

    writeHabitData(
      userId,
      title,
      category,
      duration,
      startTime,
      timeForRemember,
      habitsDone,
    );
    this.setState({
      ...INITIAL_STATE,
      userId,
    });
  };

  onSingOut = () => {
    const { history } = this.props;
    doCheckAuth(() => {
      history.push(routes.SIGN_IN);
    });
    doSignOut();
  };

  onDelete = habitId => {
    let { userId } = this.state;
    deleteHabitData(userId, habitId);
  };

  onUpdate = (habitId, updatedData) => {
    let { userId } = this.state;
    updateHabitData(userId, habitId, updatedData);
  };

  render() {
    const { title, timeForRemember, startTime, userId } = this.state;
    let updated = {
      duration: {
        ...this.state.duration,
        '2': true,
        '6': true,
      },
    };

    return (
      <div onChange={this.onChange}>
        <input
          type="text"
          placeholder="habit title"
          name="title"
          value={title}
        />
        <br />
        <input
          type="text"
          placeholder="timeForRemember"
          name="timeForRemember"
          value={timeForRemember}
        />
        <br />
        <input
          type="text"
          placeholder="start time"
          name="startTime"
          value={startTime}
        />
        <br />
        <button onClick={this.onSubmit}>Submit</button>
        <button onClick={this.onSingOut}>Sign Out</button>
        {/*<button onClick={() => this.onDelete('-L9JsitzxFt3ZKxwMl5Y')}>Delete</button>*/}
        <button onClick={() => this.onUpdate('-L9K8rDN-4DyglWhD5ji', updated)}>
          Update
        </button>
        <br />
        {userId && <HabitsList userId={userId} />}
      </div>
    );
  }
}

export default Home;
