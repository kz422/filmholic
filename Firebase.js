import firebase from 'firebase/app';
import 'firebase/analytics';

const config = {
  apiKey: "AIzaSyDEqNo6rmoV_Jcca4cl_q1U3m0w-e63k1o",
  authDomain: "tlutter-e0f5d.firebaseapp.com",
  projectId: "tlutter-e0f5d",
  storageBucket: "tlutter-e0f5d.appspot.com",
  messagingSenderId: "987599814237",
  appId: "1:987599814237:web:3389d426a08a94e9b797b4"
};

firebase.initializeApp(config);

export default firebase;
