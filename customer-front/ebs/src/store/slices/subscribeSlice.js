import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { subscribeApi } from "../../api/subscribeApi";

const initialState = {
  mysubscribe: [],
  itemlist: [],
  myactivesubscribe: [],
  itemseq: 0
};

export const getitemseq = createAsyncThunk(
  "subscribeSlice/getitemseq",
  async(data,{rejectWithValue}) => {
    try{
      const res = data;
      return res;
    }catch(err){
      rejectWithValue(err.response);
    }
  },
)

export const getsubscribeinfo = createAsyncThunk(
  "subscribeSlice/getsubscribeinfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await subscribeApi.getsubscribeinfo();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

export const getitemlist = createAsyncThunk(
  "subscribeSlice/getitemlist",
  async(data, {rejectWithValue}) => {
    try{
      const res = await subscribeApi.getitemlist(data);
      return res.data;
    } catch (err){
      return rejectWithValue(err.response);
    }
  }
);

export const getactivesubscribe = createAsyncThunk(
  "subscribeSlice/getactivesubscribe",
  async(data, {rejectWithValue}) => {
    try{
      const res = await subscribeApi.getactivesubscribe(data);
      return res.data;
    } catch (err){
      return rejectWithValue(err.response);
    }
  }
);

export const makeSubscribe = createAsyncThunk(
  "subscribeSlice/makeSubscribe",
  async(data, {rejectWithValue}) => {
    try{
      const res = await subscribeApi.makeSubscribe(data);
      return res.data;
    } catch (err){
      return rejectWithValue(err.response);
    }
  }
);


const subscribeSlice = createSlice({
  name: "subscribe",
  initialState,
  reducers: {},
  extraReducers: {
    [getsubscribeinfo.fulfilled]: (state, action) => {
      state.mysubscribe = action.payload.data;
    },
    [getitemlist.fulfilled]: (state, action) =>{
      state.itemlist = action.payload.data;
    },
    [getactivesubscribe.fulfilled]: (state, action) => {
      state.myactivesubscribe = action.payload.data;
    },
    [getitemseq.fulfilled]: (state, action) =>{
      state.itemseq = action.payload;
    },
  },
});
export const subscribeActions = subscribeSlice.actions;
export default subscribeSlice.reducer;
