import React, {Component} from 'react';

import withAuthorization from '../Session/withAuthorization';
import { onceGetUsers, auth, db } from '../../firebase';
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
        onceGetUsers().then(snapshot =>
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

        console.log(auth.currentUser.uid);
        let userid = auth.currentUser.uid;
        let category = "sex";
// let title = "jdbfv hbedvbe";
// writeNewPost(userid,  title, category);
//         function writeNewPost(userid,  title, category) {
//           let habits = db.ref().child("habits");
//           var postData = {
//             title: title,
//             category: category,
//             startTime: "дата начала действия привычки",
//                   duration: {
//                     "1": false,
//                     "2": false,
//                     "3": false,
//                     "4": false,
//                     "5": false,
//                     "6": false,
//                     "0": false
//                   },
//           };
//
//           // Get a key for a new Post.
//           var newPostKey = db.ref().child(habits).push().key;
//
//           // Write the new post's data simultaneously in the posts list and the user's post list.
//           var updates = {};
//           updates['/habits/' + newPostKey] = postData;
//           // updates['/user-posts/' + userid + '/' + newPostKey] = postData;
//
//           return db.ref().update(updates);
//         };








        function addHabits(userid, habit, category) {
          db.ref().child("habits").child(`${userid}`).push(habit).catch(err => console.log(err));

        }

        addHabits("nezGSxsSuoga24lflPtjwmVXzqw1", {


          title: "что то сделать",
          category: category,
          startTime: "дата начала действия привычки",
                duration: {
                  "1": false,
                  "2": false,
                  "3": false,
                  "4": false,
                  "5": false,
                  "6": false,
                  "0": false
                },
        }
        );





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
