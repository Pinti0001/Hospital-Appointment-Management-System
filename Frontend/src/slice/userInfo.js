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
  },
});

export const {setUserInfo} = userInfoSlice.actions;

export default userInfoSlice.reducer;