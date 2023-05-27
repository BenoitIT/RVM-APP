import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBalance } from "../../api_manger/RewardBalance_Api";
const initialState = {
  rewardBalance:0,
  status: "iddle",
  error: null,
};
export const fetchBalance = createAsyncThunk(
  "recyclables/balance",
  async () => {
    try {
      const result = await getBalance();
      const res = result;
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);
const fetchBalanceSlice = createSlice({
  name: "rewardBalance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        return {
          ...state,
          status: "loading",
        };
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        return {
          ...state,
          status: "succeeded",
          rewardBalance: action.payload,
        };
      });
  },
});
export const selectBalance = (state) => state.rewardBalance.rewardBalance;
export const fetchBalanceStatus = (state) => state.rewardBalance.status;
export default fetchBalanceSlice.reducer;
