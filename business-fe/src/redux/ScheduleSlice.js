import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { scheduleApi } from "../shared/scheduleApi.js";
// import { imgApi } from "../shared/imgApi";

import moment from "moment";


const initialState = {
  date : moment().format('YYYYMMDD'),
  reservations: [],
};

export const clickCalendarDate = createAsyncThunk(
  "scheduleSlice/clickCalendarDate",
  async (day,{ rejectWithValue }) => {
    try {
      //initialState.date = moment(day).format('YYYY-MM-DD');
      const res = moment(day).format('YYYYMMDD');
      //state.date = moment(day).format('YYYY-MM-DD');
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const getTimeSheet = createAsyncThunk(
  "scheduleSlice/getTimeSheet",
  async (date,{ rejectWithValue }) => {
    try {
      const res =  await scheduleApi.getTimeSheet(date);
      
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    // clickCalendarDate(state,day) {
    //   state.date = moment(day).format('YYYY-MM-DD');
      
    //   console.log("reducer state.date(day) : " + state.date);
    // },
  },
  extraReducers: {
    [clickCalendarDate.fulfilled]:(state, action)=>{
      state.date = action.payload;
      
      // console.log("state data: "+state.date);
      //state.date = moment(data.day).format('YYYY-MM-DD');
      //console.log("extra Reducer(day) : " + moment(data.day).format('YYYY-MM-DD'));
      //state.date = data.date;
    },
    [getTimeSheet.fulfilled]: (state, action)=>{
      state.reservations = action.payload.data;
      
      // console.log("getTimesheet fulfilled state.data: "+ JSON.stringify(state.reservations));
      
      //state.date = moment(data.day).format('YYYY-MM-DD');
      //console.log("extra Reducer(day) : " + moment(data.day).format('YYYY-MM-DD'));
      //state.date = data.date;
    },
  },
});

export const scheduleActions = scheduleSlice.actions;
export default scheduleSlice.reducer;
