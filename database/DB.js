import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCradPDaDwDTjTGtFsh5jp3jRUAXSf5jno',
  authDomain: 'sf-221-calendar.firebaseapp.com',
  projectId: 'sf-221-calendar',
  storageBucket: 'sf-221-calendar.appspot.com',
  messagingSenderId: '358505907509',
  appId: '1:358505907509:web:1644c14e68d041803f787c',
  measurementId: 'G-6Y8B68J005',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db, app};

// import * as firebase from 'firebase';
// import firestore from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyCradPDaDwDTjTGtFsh5jp3jRUAXSf5jno',
//   authDomain: 'sf-221-calendar.firebaseapp.com',
//   projectId: 'sf-221-calendar',
//   storageBucket: 'sf-221-calendar.appspot.com',
//   messagingSenderId: '358505907509',
//   appId: '1:358505907509:web:1644c14e68d041803f787c',
//   measurementId: 'G-6Y8B68J005',
// };

// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// firebase.firestore()
