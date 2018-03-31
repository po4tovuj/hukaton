import React, {Component} from 'react';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import {Route, Switch} from 'react-router-dom';
import styles from './App.css';
import Sidebar from './components/Sidebar';
import Habit from './components/Habit';


import {auth} from './firebase';

class App extends Component {
    state = {
        isLoggedIn: false,
    };

    componentWillMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    isLoggedIn: true
                });
                console.log("user is LoggedIn");

            } else {
                this.setState({
                    isLoggedIn: false,
                });
                console.log("user is LoggedOut");
            }
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <div className={styles.habit}>
                    <Sidebar/>
                    <Habit/>
                </div>
                <Switch>
                    <Route exact path="/" render={() => <div></div>}/>
                    <AuthForm/>
                    <Switch>
                        <Route exact path="/" render={() => <div></div>}/>
                        <Route render={() => <h2>404 not found!!! sorry</h2>}/>
                    </Switch>
                </Switch>
            </div>
        );
    }
}

export default App;
