import React, { useState, useEffect } from 'react';
import 'rbx/index.css';
import { Container } from 'rbx';
import {firebase,db} from './shared/firebase'
import { CourseList, addScheduleTimes } from './components/CourseList';
import Banner from './components/Banner';


// ------------
// Firebase
// ------------



// -------------
//COMPONENTS
// -------------




const App = () => {
  const [schedule, setSchedule] = useState({ title: '', courses: [] });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setSchedule(addScheduleTimes(snap.val()));
    };
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    <Container>
      <Banner title={ schedule.title } user={ user }/>
      <CourseList courses={ schedule.courses } user={ user }/>
    </Container>
  );
};

export default App;