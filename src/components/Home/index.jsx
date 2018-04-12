import React from 'react';
import HabitsList from '../HabitsList';
import { HabitContext } from '../App';
import styles from './styles.css';
import Sidebar from '../Sidebar';
import NewHabit from '../NewHabit';
import CreateHabit from '../CreateHabit';
import { Route } from 'react-router-dom';

const Home = props => (
  <HabitContext.Consumer>
    {({
      userId,
      isAuth,
      habitsList,
      showModal,
      handleOpenModal,
      handleCloseModal,
    }) =>
      isAuth ? (
        <div className={styles.habit}>
          {/* <Sidebar {...this.props} habits={data} /> */}
          <Sidebar {...props} userId={userId} habits={habitsList} />

          <div className={styles.wrapper}>
            <NewHabit handleOpenModal={handleOpenModal} />
            {/* TODO: userId не передавать пропом в HabitsList, а просто там сделать Consumer
            и брать из Context */}
            {userId && (
              <Route
                path={`${props.match.url}/:category`}
                render={props => <HabitsList {...props} userId={userId} />}
              />
            )}
            <CreateHabit
              handleCloseModal={handleCloseModal}
              showModal={showModal}
            />
            {userId && <HabitsList userId={userId} />}
          </div>
        </div>
      ) : (
        ''
      )
    // <List {...props} habits={currentUserHabits}/>
    }
  </HabitContext.Consumer>
);

export default Home;
