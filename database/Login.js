import {collection, getDocs} from 'firebase/firestore';

const collectionRef = collection(db, 'somedata-Collection');
const userQuerySnapshot = await getDocs(collectionRef);

userQuerySnapshot.forEach(doc => {
  console.log(`${doc.id} => ${doc.data()}`);
});

export {userQuerySnapshot};

// const validateLogins = (email, password) => {};
