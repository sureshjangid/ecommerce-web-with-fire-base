// import firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA642XoX7Ym_CoGIqGI7NHR2ysxA5rc8iw",
    authDomain: "e-com-d9600.firebaseapp.com",
    projectId: "e-com-d9600",
    storageBucket: "e-com-d9600.appspot.com",
    messagingSenderId: "226859988802",
    appId: "1:226859988802:web:44d4a206ef8d476ef2badb"
  };


  
  firebase.initializeApp(firebaseConfig);


  const auth = firebase.auth();
  const fs = firebase.firestore();
  const storage = firebase.storage();

  export {auth,fs,storage}