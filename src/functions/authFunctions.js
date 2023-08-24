import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import {
  TOGGLE_USER_LOADING,
  SET_CURRENT_USER,
  TOGGLE_SIGNUP_MODAL,
  TOGGLE_SIGNIN_MODAL
} from '../redux/slices/authSlice';
import { handleNonSerializablValue, handleErrorMessage } from '../utils';
import { toast } from 'react-toastify';

// check user auth
export const checkUserAuth = async dispatch => {
  try {
    // show user loading
    dispatch(TOGGLE_USER_LOADING(true));
    const unsub = onAuthStateChanged(auth, async authUser => {
      if (authUser) {
        // get current user id
        const {uid} = authUser;
        // get user info from db based on uid
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);
        // check if user is exists in db
        if (userSnap.exists()) {
          const currentUser = handleNonSerializablValue({...userSnap.data(), id: userSnap.id});
          dispatch(SET_CURRENT_USER(currentUser));
          dispatch(TOGGLE_USER_LOADING(false));
        }
      } else {
        dispatch(TOGGLE_USER_LOADING(false));
      }
    })
    
    unsub();
  }
  catch(err) {
    console.log(err);
    dispatch(TOGGLE_USER_LOADING(false));
  }
}

// sign up user
export const signUpUser = async (data, dispatch, navigate, setWaitingProccess) => {
  const {name: {value: name}, email: {value: email}, password: {value: password}} = data;
  setWaitingProccess(true);
  try {
    // get user credential
    const {user: {uid}} = await createUserWithEmailAndPassword(auth, email, password);
    // create doc ref for user and add user credential info in firestore
    const docUserRef = doc(db, 'users', uid);
    const currentUser = {
      name,
      email,
      description: '',
      avatar: null,
      location: null,
      listings: [],
      wishlists: [],
      createdAt: serverTimestamp()
    }
    await setDoc(docUserRef, currentUser);
    // add current user to state
    dispatch(SET_CURRENT_USER(handleNonSerializablValue(currentUser)));
    // close sign up modal
    dispatch(TOGGLE_SIGNUP_MODAL(false));
    // navigate to home
    navigate('/');
    // show success notify
    toast.success('Account created successfully! Welcome aboard!');
  }
  catch(err) {
    toast.error(handleErrorMessage(err.code));
  }
  finally {
    setWaitingProccess(false);
  }
}

// sign in user
export const signInUser = async (data, dispatch, navigate, setWaitingProccess) => {
  const {email: {value: email}, password: {value: password}} = data;
  try {
    setWaitingProccess(true);
    // sign in user and get user id to grab doc user from firestore
    const {user: {uid}} = await signInWithEmailAndPassword(auth, email, password);
    const docUserRef = doc(db, 'users', uid);
    const userSnap = await getDoc(docUserRef);
    if (userSnap.exists()) {
      const currentUser = handleNonSerializablValue({...userSnap.data(), id: userSnap.id});
      // add current user to state
      dispatch(SET_CURRENT_USER(currentUser));
      // close sign in modal
      dispatch(TOGGLE_SIGNIN_MODAL(false));
      // navigate to home
      navigate('/');
    }
  }
  catch(err) {
    toast.error(handleErrorMessage(err.code));
  }
  finally {
    setWaitingProccess(false);
  }
}

// sign out user
export const signOutUser = async (dispatch, navigate) => {
  // navigate to home
  navigate('/');
  try {
    await signOut(auth);
    // set current user to null
    dispatch(SET_CURRENT_USER(null));
  }
  catch(err) {
    toast.error(handleErrorMessage(err.code));
  }
}