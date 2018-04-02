import React, { Component } from 'react';

import withAuthorization from '../Session/withAuthorization';
import { auth, db } from '../../firebase';
import Sidebar from "../Sidebar";
import NewHabit from '../NewHabit';
import List from '../List';
import styles from './styles.css';
import CreateHabit from "../CreateHabit";
import { Route } from "react-router-dom";
import data from './db.json';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUserHabits: [],
            showModal: false,
            users: {},
            tasks: [],
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentDidMount(){
        let userId = auth.currentUser.uid;
        db.ref('habits/' + userId).on('value', (snapshot) => {
          console.log('added', snapshot.val());
          this.setState({
            currentUserHabits: Object.values(snapshot.val()),
          })
        });
      }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    render() {
        let currentUserHabits = this.state.currentUserHabits;
        const { showModal } = this.state;

        return (
            <div className={styles.habit}>
                {/* <Sidebar {...this.props} habits={data} /> */}
                <Sidebar {...this.props} habits={this.state.currentUserHabits} />

                <div className={styles.wrapper}>
                    <NewHabit handleOpenModal={this.handleOpenModal} />
                    <Route path={`${this.props.match.url}/:category`} render={(props) => <List {...props} habits={currentUserHabits} />} />
                    <CreateHabit handleCloseModal={this.handleCloseModal} showModal={showModal} />
                </div>
            </div>
        );
    }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
