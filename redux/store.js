import { configureStore } from "@reduxjs/toolkit";
import multiStepFormSlice from "./multisSteps/multiStepFormSlice";
export const store = configureStore({
  reducer: { 
    currentPage: multiStepFormSlice,
  },
});