import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB4ECh1K92n8ddzYk5N1elw_ERWXBc2S00",
    authDomain: "clothes-store-db-a8448.firebaseapp.com",
    projectId: "clothes-store-db-a8448",
    storageBucket: "clothes-store-db-a8448.appspot.com",
    messagingSenderId: "339076061120",
    appId: "1:339076061120:web:542aa5e2f06828615a1a25"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
      userAuth, 
      additionalInformation = {}
      ) => {

        if(!userAuth) return;

        const userDocRef = doc(db, 'users', userAuth.uid)

        const userSnapshot = await getDoc(userDocRef);

        if(!userSnapshot.exists()){
          const { displayName, email } = userAuth;
          const createdAt = new Date();

        try {
          await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            additionalInformation,
          });
        }catch(error){
          console.log('error creating user', error.message)
        }
      }
        
      return userDocRef
  }

//helper functions

  export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);

  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);

  }

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 

  onAuthStateChanged(auth, callback);