import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  Location: null,
  zone: null,
  numberOfRecyclables: null,
  bottleType: null,
};
const RecyclablesSlice = createSlice({
  name: "recyclables",
  initialState,
  reducers: {
    saveLocation: (state, action) => {
      return {
        ...state,
        Location: action.payload,
      };
    },
    saveZone: (state, action) => {
      return {
        ...state,
        zone: action.payload,
      };
    },
    saveBottleType: (state, action) => {
      return {
        ...state,
        bottleType: action.payload,
      };
    },
    saveNumberOfRecyclables: (state, action) => {
      return {
        ...state,
        numberOfRecyclables: action.payload,
      };
    },
  },
});
export const {
  saveLocation,
  saveZone,
  saveBottleType,
  saveNumberOfRecyclables,
} = RecyclablesSlice.actions;
export const getLocation = (state) => state.recyclables.Location;
export const getZone = (state) => state.recyclables.zone;
export const getBottleType = (state) => state.recyclables.bottleType;
export const getSaveNumberOfRecyclables = (state) =>
  state.recyclables.saveNumberOfRecyclables;
export default RecyclablesSlice.reducer;
