import { createSlice } from "@reduxjs/toolkit";



const userInfoSlice = createSlice({
  name: "currentUserInfo",
  initialState: {
    email: "",
    number: "",
    userObjectId: "",
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.email = action.payload.email;
      state.number = action.payload.number;
      state.userObjectId = action.payload.userObjectId;
    },

    logout: () => {
      // Reset state to its initial values
      return {
        email: "",
        number: "",
        userObjectId: "",
      };
    },
  },
});

export const { setUserInfo, logout } = userInfoSlice.actions;

export default userInfoSlice.reducer;