import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUserLoading: true,
  currentUser: null,
  signUpModal: false,
  signInModal: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SHOW_USER_LOADING: state => {
      state.currentUserLoading = true;
    },
    HIDE_USER_LOADING: state => {
      state.currentUserLoading = false;
    },
    TOGGLE_USER_LOADING: (state, action) => {
      state.currentUserLoading = action.payload;
    },
    SET_CURRENT_USER: (state, action) => {
      state.currentUser = action.payload;
    },
    UPDATE_CURRENT_USER: (state, action) => {
      state.currentUser = {...state.currentUser, ...action.payload};
    },
    OPEN_SIGN_UP_MODAL: state => {
      state.signUpModal = true;
    },
    CLOSE_SIGN_UP_MODAL: state => {
      state.signUpModal = false;
    },
    TOGGLE_SIGNUP_MODAL: (state, action) => {
      state.signUpModal = action.payload;
    },
    OPEN_SIGN_IN_MODAL: state => {
      state.signInModal = true;
    },
    CLOSE_SIGN_IN_MODAL: state => {
      state.signInModal = false;
    },
    TOGGLE_SIGNIN_MODAL: (state, action) => {
      state.signInModal = action.payload;
    }
    // imaces takodje f-ju koja update-uje currentUser svojstva
    // i umetni je kod currentUser
  }
});

export const {
  SHOW_USER_LOADING,
  HIDE_USER_LOADING,
  TOGGLE_USER_LOADING,
  SET_CURRENT_USER,
  UPDATE_CURRENT_USER,
  TOGGLE_SIGNUP_MODAL,
  TOGGLE_SIGNIN_MODAL,
  OPEN_SIGN_UP_MODAL,
  CLOSE_SIGN_UP_MODAL,
  OPEN_SIGN_IN_MODAL,
  CLOSE_SIGN_IN_MODAL
} = authSlice.actions;

export default authSlice.reducer;