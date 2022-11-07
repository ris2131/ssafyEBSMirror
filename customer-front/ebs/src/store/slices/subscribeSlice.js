import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { subscribeApi } from "../../api/subscribeApi";

const initialState = {
  mysubscribe: [],
};

export const getsubscribeinfo = createAsyncThunk(
  "subscribeSlice/getsubscribeinfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await subscribeApi.getsubscribeinfo();
      console.log("!!!!!!!!!!!!!!!" + res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

const subscribeSlice = createSlice({
  name: "subscribe",
  initialState,
  reducers: {},
  extraReducers: {
    [getsubscribeinfo.fulfilled]: (state, action) => {
      state.mysubscribe = action.payload.data;
      console.log(state.mysubscribe);
    },
  },
});
export const subscribeActions = subscribeSlice.actions;
export default subscribeSlice.reducer;
