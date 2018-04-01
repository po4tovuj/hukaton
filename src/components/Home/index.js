import React, {Component} from 'react';

import withAuthorization from '../Session/withAuthorization';
import { onceGetUsers, auth } from '../../firebase';
import Sidebar from "../Sidebar";
import Habit from "../Habit";
import NewHabit from "../NewHabits";
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
        onceGetUsers().then(snapshot =>
            this.setState(() => ({users: snapshot.val()}))
        );
    }

    render() {
        console.log(auth.currentUser.uid);
        const {users} = this.state;
        return (
            <div className={styles.habit}>
                <Sidebar/>
                <div className={styles.wrapper}>
                    <NewHabit />
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
