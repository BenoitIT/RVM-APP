import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1,
   };

export const multiStepFormSlice = createSlice({
    name: "currentPage",
    initialState,
    reducers: {
      setCurrentPage: (state,action) => {
       return {
        ...state, currentPage: action.payload,
       }
      },
    },
  });
  
  export const { setCurrentPage } = multiStepFormSlice.actions;

  export const showPage = (state)=>state.currentPage.currentPage;
  
  export default multiStepFormSlice.reducer;