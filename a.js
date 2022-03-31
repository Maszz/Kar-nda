import {collection, doc, setDoc, getDoc} from 'firebase/firestore';
import {db} from './database/DB';
const firestoreRef = collection(db, 'somedata-Collection');
import moment from 'moment';
import * as RNLocalize from 'react-native-localize';
// const docSnap = await getDoc(firestoreRef);

// firestoreRef.get().then(account => {
//   account.docs.forEach(item => {
//     let data = item.data();
//     console.log(data);
//   });
// });
// console.log('hello world');
console.log(moment(Date.now()));
