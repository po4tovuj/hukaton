import React, {Component} from 'react';

import withAuthorization from '../Session/withAuthorization';
import {db} from '../../firebase';
import Sidebar from "../Sidebar";
import Habit from "../Habit";
import NewHabit from "../NewHabits";
import styles from './styles.css';
import DateField from "../DateField";
import CreateHabit from "../CreateHabit";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            users: {}
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentDidMount() {
        db.onceGetUsers().then(snapshot =>
            this.setState(() => ({users: snapshot.val()}))
        );
    };

    handleOpenModal () {
      this.setState({ showModal: true });
    }

    handleCloseModal () {
      this.setState({ showModal: false });
    }

    render() {
        const {users, showModal} = this.state;
        return (
            <div className={styles.habit}>
                <Sidebar/>
                <div className={styles.wrapper}>
                    <NewHabit handleOpenModal={this.handleOpenModal} />
                    <DateField/>
                    <Habit/>
                    <CreateHabit handleCloseModal={this.handleCloseModal} showModal={showModal} />
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
