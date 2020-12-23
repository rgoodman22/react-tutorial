import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBLOfAMt6NTAgF7FdOxxOtpmQLXmEkRPQ4",
    authDomain: "scheduler-fb.firebaseapp.com",
    databaseURL: "https://scheduler-fb-default-rtdb.firebaseio.com",
    projectId: "scheduler-fb",
    storageBucket: "scheduler-fb.appspot.com",
    messagingSenderId: "252211528696",
    appId: "1:252211528696:web:bca6d301d48394f4c60c0d",
    measurementId: "G-Y239MVXLBY"
  };


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }else {
    firebase.app(); // if already initialized, use that one
  }
  
  const db = firebase.database().ref();

  export { firebase, db};