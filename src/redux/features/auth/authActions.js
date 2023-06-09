import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import {
  SHOW_USER_LOADING,
  HIDE_USER_LOADING,
  SET_CURRENT_USER,
  OPEN_SIGN_UP_MODAL,
  CLOSE_SIGN_UP_MODAL,
  OPEN_SIGN_IN_MODAL,
  CLOSE_SIGN_IN_MODAL
} from './authSlice';
import { handleErrorMessage } from '../../../utils';
import { toast } from 'react-toastify';

export const checkUserAuth = async (dispatch, navigate) => {
  const authToken = localStorage.getItem('jwt') ?? null;
  if (authToken) {
    showUserLoading(dispatch);
    try {
      const payloadEncoded = authToken.split('.')[1];
      // get exp value
      const {exp, user_id} = JSON.parse(atob(payloadEncoded));
      
      // check if exp value is lower than now
      if ((exp * 1000) < Date.now()) {
        const unsubscribe = onAuthStateChanged(auth, async user => {
          if (user) {
            const refreshedToken = await user.getIdToken(true);
            localStorage.setItem('jwt', refreshedToken);
          }
        });

        unsubscribe();
      }
      
      // get current user from firestore
      const docUserRef = doc(db, 'users', user_id);
      const userSnap = await getDoc(docUserRef);
      if (userSnap.exists()) {
        let currentUser = userSnap.data();
        // to prevent non-serializable-value redux
        currentUser = {...currentUser, createdAt: currentUser.createdAt.seconds * 1000};
        dispatch(SET_CURRENT_USER(currentUser));
      } else {
        localStorage.removeItem('jwt');
        navigate('/');
        openSignInModal(dispatch);
      }
    }
    catch(err) {
      toast.error(handleErrorMessage(err.code));
    }
    finally {
      hideUserLoading(dispatch);
    }
  } else {
    hideUserLoading(dispatch);
  }
}

export const signUpUser = async (data, dispatch, navigate) => {
  const {name: {value: name}, email: {value: email}, password: {value: password}} = data;
  try {
    // get user credential
    const {user: {uid, accessToken}} = await createUserWithEmailAndPassword(auth, email, password);
    // create doc ref for user and add user credential info in firestore
    const docUserRef = doc(db, 'users', uid);
    const currentUser = {
      name,
      email,
      description: null,
      avatar: null,
      location: null,
      listings: [],
      wishlists: [],
      createdAt: serverTimestamp()
    }
    await setDoc(docUserRef, currentUser);
    // add current user to state
    dispatch(SET_CURRENT_USER({...currentUser, createdAt: Date.now()}));
    // close sign up modal
    dispatch(CLOSE_SIGN_UP_MODAL());
    // store token into localStorage
    localStorage.setItem('jwt', accessToken);
    // navigate to home
    navigate('/');
    // show success notify
    toast.success('Account created successfully! Welcome aboard!');
  }
  catch(err) {
    toast.error(handleErrorMessage(err.code));
  }
}

export const signInUser = async (data, dispatch, navigate) => {
  const {email: {value: email}, password: {value: password}} = data;
  try {
    // sign in user and get user id to grap doc user from firestore
    const {user: {uid, accessToken}} = await signInWithEmailAndPassword(auth, email, password);
    const docUserRef = doc(db, 'users', uid);
    const userSnap = await getDoc(docUserRef);
    if (userSnap.exists()) {
      let currentUser = userSnap.data();
      // to prevent non-serializable-value redux
      currentUser = {...currentUser, createdAt: currentUser.createdAt.seconds * 1000};
      // add current user to state
      dispatch(SET_CURRENT_USER(currentUser));
      // close sign in modal
      dispatch(CLOSE_SIGN_IN_MODAL());
      // add token to local storage
      localStorage.setItem('jwt', accessToken);
      // navigate to home
      navigate('/');
    }
  }
  catch(err) {
    toast.error(handleErrorMessage(err.code));
  }
}

export const signOutUser = async dispatch => {
  try {
    await signOut(auth);
    // set user and remove currer token from local storage
    dispatch(SET_CURRENT_USER(null));
    localStorage.removeItem('jwt');
  }
  catch(err) {
    toast.error(handleErrorMessage(err.code));
  }
}

export const showUserLoading = dispatch => {
  dispatch(SHOW_USER_LOADING());
}

export const hideUserLoading = dispatch => {
  dispatch(HIDE_USER_LOADING());
}

export const openSignUpModal = dispatch => {
  dispatch(OPEN_SIGN_UP_MODAL());
}

export const closeSignUpModal = dispatch => {
  dispatch(CLOSE_SIGN_UP_MODAL());
}

export const openSignInModal = dispatch => {
  dispatch(OPEN_SIGN_IN_MODAL());
}

export const closeSignInModal = (dispatch, navigate) => {
  dispatch(CLOSE_SIGN_IN_MODAL());
  if (window.location.search) navigate('/');
}