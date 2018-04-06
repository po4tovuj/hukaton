import React, {Component} from 'react';
import {auth, deleteHabitData, doSignOut, habitsDbRef} from "../../firebase";
import Habit from "../Habit";

class HabitsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            habitsList:{},
        };
    }

    initOnceOnValueListener = () => {
        this.state.userId && habitsDbRef
            .child(this.state.userId)
            .once('value', (snapshot) => {
                snapshot.val() && this.setState({habitsList: snapshot.val()});
            });
    };

    initChildAddedListener = () => {
        this.state.userId && habitsDbRef
            .child(this.state.userId)
            .orderByKey()
            .limitToLast(1)
            .on('child_added', snapshot => {
                snapshot.val() && this.setState({habitsList: snapshot.val()});
            });
    };

    initChildRemovedListener = () => {
        this.state.userId && habitsDbRef
            .child(this.state.userId)
            .orderByKey()
            .limitToLast(1)
            .on('child_removed', snapshot => {
                snapshot.val() && this.setState({habitsList: snapshot.val()});
            });
    };

    getHabits = () => {
        this.initOnceOnValueListener();
        // this.initChildAddedListener();
        this.initChildRemovedListener();
    };

    componentDidMount() {
        auth
            .onAuthStateChanged(user => {
                if (user) {
                    this.setState({
                        userId: user.uid,
                    });
                    this.getHabits(user.uid);
                }
                else {
                    doSignOut();
                }
            })
    }

    render() {
        console.log(this.state.habitsList);
        console.log('length', Object.keys(this.state.habitsList).length);
        return (
            <div>
                UserID={this.state.userId}
                <br/>
                {this.state.habitsList && Object.values(this.state.habitsList).map((habitObj, index) => {
                    return (
                        <Habit key={habitObj.habitId} id={habitObj.habitId} index={index} htitle={habitObj.title}
                               dayHabitState={habitObj.duration} habitsDone={habitObj.habitsDone}
                               onDelete={deleteHabitData} userID={this.state.userId}/>
                    )
                })}
            </div>
        );
    }
}

export default HabitsList;