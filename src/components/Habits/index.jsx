import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import HabitsList from '../HabitsList';
import Sidebar from '../Sidebar';
import NewHabit from '../NewHabit';
import CreateHabit from '../CreateHabit';
import {HabitContext} from '../App';
import {auth, getAllAndJoin, habitsDbRef} from "../../firebase";
import styles from './styles.css';

const INITIAL_STATE = {
    title: '',
    duration: null,
    category: '',
    startTime: '',
    timeForRemember: '',
    habitsList: null,
    habitsCounter: {
        'family': 0,
        'health': 0,
        'self-development': 0,
        'hobbys': 0,
        'environment': 0,
        'finance': 0,
        'carrier': 0,
        'voyage': 0,
    },

};

export default class Habits extends Component {
    state = {
        ...INITIAL_STATE,
        userId: auth.currentUser.uid,
        showModal: false,
        chosenCategory: '' || 'family',
        habitsDone: null,
    };

    handleOpenModal = () => {
        console.log("Modal is opened");
        this.setState({showModal: true});
    };

    handleCloseModal = () => {
        this.setState({showModal: false});
    };

    componentDidMount() {
        this.getHabits();
    }

    componentDidUpdate(nextProps, nextState) {
        nextState.chosenCategory !== this.state.chosenCategory && this.initOnceOnValueListener();
    }

    createHabitsCounter = () => {
        habitsDbRef.child(this.state.userId + '/habitsCounter').set({
            ...INITIAL_STATE.habitsCounter,
        });
    };

    initOnceOnValueListener = () => {
        const category = this.state.chosenCategory;

        habitsDbRef.child(this.state.userId + '/habitsCounter').once('value', snapshot => {

            snapshot.val()
                ? (this.setState({habitsCounter: snapshot.val()}))
                : this.createHabitsCounter();
            // console.log('Base? = ', this.state.habitsCounter);  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        });

        habitsDbRef
            .child(this.state.userId + '/' + category)
            .once('value', snapshot => {
                snapshot.val()
                    ? this.setState({habitsList: snapshot.val()})
                    : this.setState({habitsList: {}});
            });
    };

    initChildAddedListener = () => {
        let category = this.state.chosenCategory;

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
        let category = this.state.chosenCategory;

        habitsDbRef
            .child(this.state.userId + '/' + category)
            .on('child_removed', snapshot => {
                snapshot.val() &&
                this.setState(prevState => {
                    const {[snapshot.key]: _, ...rest} = prevState.habitsList;
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

    onCategoryClick = (category) => {
        this.setState({
            chosenCategory: category,
        });
    };

    onGetAllClick = () => {
        getAllAndJoin(this.state.userId)
            .then(result => {
                    let {habitsCounter: _, ...rest} = result.val();
                    let arr = [];
                    let today = new Date();

                    Object.values(rest).forEach(elem => {
                        arr = arr.concat(Object.values(elem));
                    });

                    let filteredHabitsList = arr.filter(habit => habit.startDate <= today.setHours(0, 0, 0, 0) && habit.duration[today.getDay()]);
                    this.setState({
                        habitsList: filteredHabitsList,
                    })
                }
            )
    };

    render() {
        let {habitsCounter} = this.state;
        return (
            <HabitContext.Consumer>
                {({
                      userId,
                      isAuth,
                  }) =>
                    isAuth ? (
                        <div className={styles.habit}>
                            <Sidebar {...this.props} userId={userId} habitsCounter={habitsCounter}
                                     onCategoryClick={this.onCategoryClick} onGetAllClick={this.onGetAllClick}/>

                            <div className={styles.wrapper}>
                                <NewHabit handleOpenModal={this.handleOpenModal}/>
                                {userId && (
                                    <Route
                                        path={`${this.props.match.url}/:category`}
                                    />
                                )}
                                <CreateHabit
                                    handleCloseModal={this.handleCloseModal}
                                    showModal={this.state.showModal}
                                    onCategoryClick={this.onCategoryClick}
                                />
                                {userId && <HabitsList habitsList={this.state.habitsList}/>}
                            </div>
                        </div>
                    ) : (
                        ''
                    )
                }
            </HabitContext.Consumer>
        );
    }
}