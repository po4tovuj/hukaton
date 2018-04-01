import React, {Component} from 'react';

import withAuthorization from '../Session/withAuthorization';
import {db} from '../../firebase';
import Sidebar from "../Sidebar";
import Habit from "../Habit";
import styles from './styles.css';
import DateField from "../DateField";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: {}
        };
    }

    componentDidMount() {
        db.onceGetUsers().then(snapshot =>
            this.setState(() => ({users: snapshot.val()}))
        );
    }

    render() {
        const {users} = this.state;
        return (
            <div className={styles.habit}>
                <Sidebar/>
                <div className={styles.wrapper}>
                    <DateField/>
                    <Habit/>
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
