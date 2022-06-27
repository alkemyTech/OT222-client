import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogged: false,
    user: {},
  },
  reducers: {
    login: (state) => {
      state.isLogged = true;
    },
    logout: (state) => {
      state.isLogged = false;
      state.user = {};
    },
    handleUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, handleUser } = userSlice.actions; // user actions

export const selectUserStatus = (state) => state.user.isLogged; // return user status

export const selectUser = (state) => state.user.user; // return user data

export const setUserAsync = (user) => (dispatch) => {
  dispatch(handleUser(user));
};

export default userSlice.reducer;
