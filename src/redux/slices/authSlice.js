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
    TOGGLE_USER_LOADING: (state, action) => {
      state.currentUserLoading = action.payload;
    },
    SET_CURRENT_USER: (state, action) => {
      state.currentUser = action.payload;
    },
    UPDATE_CURRENT_USER: (state, action) => {
      state.currentUser = {...state.currentUser, ...action.payload};
    },
    TOGGLE_SIGNUP_MODAL: (state, action) => {
      state.signUpModal = action.payload;
    },
    TOGGLE_SIGNIN_MODAL: (state, action) => {
      state.signInModal = action.payload;
    }
  }
});

export const {
  TOGGLE_USER_LOADING,
  SET_CURRENT_USER,
  UPDATE_CURRENT_USER,
  TOGGLE_SIGNUP_MODAL,
  TOGGLE_SIGNIN_MODAL
} = authSlice.actions;

export default authSlice.reducer;