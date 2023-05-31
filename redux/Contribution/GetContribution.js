import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRecyclableList } from "../../api_manger/Statistics_Api";
const initialState = {
  recylingHistory: [],
  status: "iddle",
  error: null,
  message: "",
};
export const fetchHistory = createAsyncThunk("recyclables/list", async () => {
  try {
    const result = await getRecyclableList();
    const res = result;
    return res.data;
  } catch (error) {
    return error.message;
  }
});
const recylingHistorySlice = createSlice({
  name: "recylingHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        return {
          ...state,
          status: "loading",
        };
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        return {
          ...state,
          status: "succeeded",
          recylingHistory: action.payload.data.sort((a,b)=>b?.id-a?.id),
        };
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.error.message,
        };
      });
  },
});
export const selectHistory= (state) => state.recylingHistory.recylingHistory;
export const fetchStatus = (state) => state.recylingHistory.status;
export default recylingHistorySlice.reducer;