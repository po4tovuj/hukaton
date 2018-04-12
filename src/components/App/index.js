import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import Home from '../Home';
import Header from '../Header';
import * as routes from '../../constants/routes';
import {
  deleteHabitData,
  initAuthStateListener,
  doSignOut,
  habitsDbRef,
  updateHabitData,
  writeHabitData,
} from '../../firebase';
import './index.css';

export const HabitContext = React.createContext();

const INITIAL_STATE = {
  isloading: false,
  userId: null,
  email: '',
  displayName: '',
  title: '',
  duration: null,
  category: '',
  startTime: '',
  timeForRemember: '',
  isAuth: false,
};

// TODO: вынести хобитов в Home
class App extends React.Component {
  state = {
    ...INITIAL_STATE,
    habitsList: null,
    showModal: false,
    chosenCategory: '',
    habitsDone: null,
    habitsCounter: {
      family: '0',
      health: '0',
      'self-development': '0',
      hobbys: '0',
      environment: '0',
      finance: '0',
      carier: '0',
      voyage: '0',
    },
  };

  componentDidMount() {
    initAuthStateListener(this.onSignIn, this.onSignOut);
  }

  onSignIn = user => {
    this.setState({
      isloading: false,
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      isAuth: true,
    });
    this.getHabits();
  };

  onSignOut = () => {
    doSignOut().then(() => {
      console.log('doSignOut then');
      this.setState({ ...INITIAL_STATE }, () =>
        this.props.history.push(routes.SIGN_IN),
      );
    });
  };

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

  onDelete = habitId => {
    const { userId } = this.state;
    deleteHabitData(userId, habitId);
  };

  onUpdate = (habitId, updatedData) => {
    const { userId } = this.state;
    updateHabitData(userId, habitId, updatedData);
  };

  initOnceOnValueListener = () => {
    const category = this.state.chosenCategory || 'family';

    habitsDbRef
      .child(this.state.userId + '/' + category)
      .once('value', snapshot => {
        snapshot.val() && this.setState({ habitsList: snapshot.val() });
      });
  };

  initChildAddedListener = () => {
    let category = this.state.chosenCategory || 'family';

    habitsDbRef
      .child(this.state.userId + '/' + category)
      .orderByKey()
      .limitToLast(1)
      .on('child_added', snapshot =>
        this.setState(prevState => ({
          habitsList: {
            ...prevState.habitsList,
            [snapshot.key]: snapshot.val(),
          },
        })),
      );
  };

  initChildRemovedListener = () => {
    let category = this.state.chosenCategory || 'family';

    habitsDbRef
      .child(this.state.userId + '/' + category)
      .on('child_removed', snapshot => {
        snapshot.val() &&
          this.setState(prevState => {
            const { [snapshot.key]: _, ...rest } = prevState.habitsList;
            return {
              habitsList: rest,
            };
          });
      });
  };

  getHabits = () => {
    this.initOnceOnValueListener();
    this.initChildAddedListener();
    this.initChildRemovedListener();
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    // FIXME: Вынести все что связано с Habits на страницу Home.
    // Сделать Home умным и хранить стейт там.
    const { isAuth } = this.state;

    return (
      <div className="app">
        <HabitContext.Provider
          value={{
            ...this.state,
            onChange: this.onChange,
            onSubmit: this.onSubmit,
            onSignOut: this.onSignOut,
            onDelete: this.onDelete,
            onUpdate: this.onUpdate,
            handleOpenModal: this.handleOpenModal,
            handleCloseModal: this.handleCloseModal,
          }}>
          <Header />

          <Switch>
            {!isAuth && (
              <Route exact path={routes.SIGN_IN} component={SignInPage} />
            )}
            {!isAuth && <Route path={routes.SIGN_UP} component={SignUpPage} />}
            {isAuth && <Route path={routes.HOME} component={Home} />}
          </Switch>
        </HabitContext.Provider>
      </div>
    );
  }
}

export default App;
