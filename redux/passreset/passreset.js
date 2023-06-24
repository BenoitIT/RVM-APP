import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PhoneNumber: null,
};
export const HoldPhoneNumberSlice = createSlice({
  name: "PhoneNumber",
  initialState,
  reducers: {
    setPhoneNumber: (state, action) => {
      return {
        ...state,
        PhoneNumber: action.payload,
      };
    },
  },
});

export const { setPhoneNumber } = HoldPhoneNumberSlice.actions;

export const showPhonenumber = (state) => state.PhoneNumber.PhoneNumber;

export default HoldPhoneNumberSlice.reducer;
