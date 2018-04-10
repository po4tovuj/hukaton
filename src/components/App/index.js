import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import * as routes from '../../constants/routes';
import Home from '../Home';
import './index.css';
import {
    auth,
    deleteHabitData,
    doCheckAuth,
    doSignOut,
    habitsDbRef,
    updateHabitData,
    writeHabitData
} from "../../firebase";
import Header from "../Header";

export const HabitContext = React.createContext();

let INITIAL_STATE = {
    isloading: true,
    userId: null,
    email: '',
    displayName: '',
    title: '',
    duration: null,
    category: '',
    startTime: '',
    timeForRemember: '',
    habitsDone: {},
};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE,
            habitsList: null,
            showModal: false,
            isAuth: false,
            chosenCategory: '',
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    isloading: false,
                    userId: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    isAuth: true,
                });
                this.getHabits();
                // getAllAndJoin(user.uid);
            } else {
                doSignOut();
            }
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

    onSignOut = () => {
        const {history} = this.props;
        doCheckAuth(() => {
            history.push(routes.SIGN_IN);
        });
        doSignOut();
    };

    onDelete = habitId => {
        let {userId} = this.state;
        deleteHabitData(userId, habitId);
    };

    onUpdate = (habitId, updatedData) => {
        let {userId} = this.state;
        updateHabitData(userId, habitId, updatedData);
    };

    initOnceOnValueListener = () => {
        let category = this.state.chosenCategory || 'family';
        habitsDbRef.child(this.state.userId +'/' + category).once('value', snapshot => {
            snapshot.val() && this.setState({habitsList: snapshot.val()});
        });
    };

    initChildAddedListener = () => {
        let category = this.state.chosenCategory || 'family';
        habitsDbRef
            .child(this.state.userId +'/' + category)
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
        habitsDbRef.child(this.state.userId +'/' + category).on('child_removed', snapshot => {
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

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    render() {
        return (
            <Router>
                <div className="app">
                    <Header/>

                    <hr/>
                    <Route exact path={routes.SIGN_IN} component={SignInPage}/>
                    <Route path={routes.SIGN_UP} component={SignUpPage}/>
                    <HabitContext.Provider
                        value={{
                            userId: this.state.userId,
                            habitsList: this.state.habitsList,
                            title: this.state.title,
                            timeForRemember: this.state.timeForRemember,
                            startTime: this.state.startTime,
                            showModal: this.state.showModal,
                            isAuth: this.state.isAuth,
                            onChange: this.onChange,
                            onSubmit: this.onSubmit,
                            onSignOut: this.onSignOut,
                            onDelete: this.onDelete,
                            onUpdate: this.onUpdate,
                            handleOpenModal: this.handleOpenModal,
                            handleCloseModal: this.handleCloseModal,

                        }}
                    >
                        <Route path={routes.HOME} component={Home}/>
                    </HabitContext.Provider>
                </div>
            </Router>
        );
    }
}

export default App;
