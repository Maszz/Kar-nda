import {collection, doc, setDoc, getDoc} from 'firebase/firestore';
import {db} from './database/DB';
const firestoreRef = collection(db, 'somedata-Collection');
// const docSnap = await getDoc(firestoreRef);

firestoreRef.get().then(account => {
  account.docs.forEach(item => {
    let data = item.data();
    console.log(data);
  });
});
// console.log('hello world');
