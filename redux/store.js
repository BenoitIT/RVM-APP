import { configureStore } from "@reduxjs/toolkit";
import multiStepFormSlice from "./multisSteps/multiStepFormSlice";
import RecyclablesSlice from "./multisSteps/RecyclablesData";
import recyclingHistorySlice from "./Contribution/GetContribution";
import fetchBalanceSlice from "./rewards/getBalanceSlice";
export const store = configureStore({
  reducer: { 
    currentPage: multiStepFormSlice,
    recyclables:RecyclablesSlice,
    recylingHistory:recyclingHistorySlice,
    rewardBalance:fetchBalanceSlice
  },
});