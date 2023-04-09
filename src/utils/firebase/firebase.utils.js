
// Firebase
import { initializeApp } from 'firebase/app';

import { getAuth, 
         signInWithRedirect, 
         signInWithPopup, 
         GoogleAuthProvider,
         createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore,
         doc,
         getDoc,
         setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQhJwFUc306NrJIhvOJMJ-OFZSjQYtcMY",
    authDomain: "webcinocrwnstore.firebaseapp.com",
    projectId: "webcinocrwnstore",
    storageBucket: "webcinocrwnstore.appspot.com",
    messagingSenderId: "483380244907",
    appId: "1:483380244907:web:796d6a36a82d8acb1a22ee"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider()

  provider.setCustomParameters({
    prompt : 'select_account'
  });

  export const auth = getAuth();

  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

  export const db = getFirestore();

  export const createUserDocument = async (userAuth, additionalInformation = {displayName: ''}) => {

    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (e) {
            console.log('Hm..There seems to be an error!', e.message)
        }
    }

    return userDocRef

  }

  export const createUserEmailPassword = async (email, password) => {
    if (!email || !password) return ;

    return await createUserWithEmailAndPassword(auth, email, password);
  } 