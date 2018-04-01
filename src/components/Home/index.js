import React, { Component } from 'react';

import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';
import Sidebar from "../Sidebar";
import NewHabit from '../NewHabit';
import List from '../List';
import styles from './styles.css';
import habitsData from './db.json';
import { Route } from 'react-router-dom';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            userHabbits: []
        };
    }

    componentDidMount() {
        db.onceGetUsers().then(snapshot => {
            this.setState(() => ({ user: snapshot.val() }));
        }
        );
        const userHabbits = Object.values(habitsData.habits.userID1);
        console.log('userHabbits: ', userHabbits);
    }

    render() {
        const { user } = this.state;
        const { match } = this.props;
        const userId = Object.values(habitsData.habits.userID1);

        return (
            <div className={styles.habit}>
                <Sidebar {...this.props} userId={userId} habitsData={habitsData}/>

                <div className={styles.wrapper}>
                    <NewHabit />
                    <Route path={`${match.url}/:category`} render={(props) => <List {...props} habits={userId} />} />
                </div>
            </div>
        );
    }
}

// const UserList = ({ users }) =>
//   <div>
//     <h2>List of Usernames of Users</h2>
//     <p>(Saved on Sign Up in Firebase Database)</p>

//     {Object.keys(users).map(key =>
//       <div key={key}>{users[key].username}</div>
//     )}
//   </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
