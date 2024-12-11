import { createSlice } from "@reduxjs/toolkit";

const hospitalInfoSlice = createSlice({
  name: "currentHospitalInfo",
  initialState: {
    hospitalName: "",
    email: "",
    number: "",
    address: "",
    state: "",
    district: "",
    city_pinCode: "",
    hospitalObjectId: "",
  },
  reducers: {
    setHospitalInfo: (state, action) => {
      state.hospitalName = action.payload.hospitalName;
      state.email = action.payload.email;
      state.number = action.payload.number;
      state.address = action.payload.address;
      state.state = action.payload.state;
      state.district = action.payload.district;
      state.city_pinCode = action.payload.city_pinCode;
      state.hospitalObjectId = action.payload.hospitalObjectId;
    },
    logout: () => {
      // Reset state to its initial values
      return {
        hospitalName: "",
        email: "",
        number: "",
        address: "",
        state: "",
        district: "",
        city_pinCode: "",
        hospitalObjectId: "",
      };
    },
  },
});

export const { setHospitalInfo, logout } = hospitalInfoSlice.actions;

export default hospitalInfoSlice.reducer;
