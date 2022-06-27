import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogged: false,
    userData: {},
  },
  reducers: {
    login: (state) => {
      state.isLogged = true;
    },
    logout: (state) => {
      state.isLogged = false;
    },
    handleUser: (state, action) => {
      state.userData = state.userData = action.payload;
    },
  },
});

export const { login, logout, handleUser } = userSlice.actions; // user actions

export const selectUser = state => state.user.isLogged // return user status 

export const showUser = state => state.user.userData // return user data

export const setUserAsync = (user) => dispatch => {
    dispatch(handleUser(user))
}

export default userSlice.reducer