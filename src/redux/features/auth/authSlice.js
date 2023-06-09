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
    SET_CURRENT_USER: (state, action) => {
      state.currentUser = action.payload;
    },
    OPEN_SIGN_UP_MODAL: state => {
      state.signUpModal = true;
    },
    CLOSE_SIGN_UP_MODAL: state => {
      state.signUpModal = false;
    },
    OPEN_SIGN_IN_MODAL: state => {
      state.signInModal = true;
    },
    CLOSE_SIGN_IN_MODAL: state => {
      state.signInModal = false;
    }
  }
});

export const {
  SHOW_USER_LOADING,
  HIDE_USER_LOADING,
  SET_CURRENT_USER,
  OPEN_SIGN_UP_MODAL,
  CLOSE_SIGN_UP_MODAL,
  OPEN_SIGN_IN_MODAL,
  CLOSE_SIGN_IN_MODAL
} = authSlice.actions;

export default authSlice.reducer;