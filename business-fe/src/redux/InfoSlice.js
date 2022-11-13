import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { infoApi } from "../shared/infoApi.js";
import { imgApi } from "../shared/imgApi.js";

const initialState = {
  isLoggedIn: false,
  
  profile: {
    name:"",
    phone:"",
    address:"",
    homepage:"",
    description:"",
    notice:"",
    photo:"",
  },
};

export const getinfo = createAsyncThunk(
  "InfoSlice/getinfo",
  async (data, {rejectWithValue}) => {
    try {
      const res = await infoApi.getinfo();
      console.log(res.data.data)
      return res.data;
    } catch (err) {
      console.log("getInfo err");
      console.error(err);
      return rejectWithValue(err.response);
    }
  }
);
//from imgApi
export const modifyinfo = createAsyncThunk(
  "InfoSlice/modifyinfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await imgApi.modifyinfo(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const registerinfo = createAsyncThunk(
  "InfoSlice/registerinfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await infoApi.registerinfo();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const InfoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
    },
    reload(state) {
      state.isLoggedIn = true;
    },
  },
  extraReducers: {
    [getinfo.fulfilled]: (state, action) => {
      const {data} = action.payload;
      state.isLoggedIn = true;
      state.profile.name = data.name;
      state.profile.phone = data.phone;
      state.profile.address = data.address;
      state.profile.homepage = data.homepage;
      state.profile.description = data.description;
      state.profile.notice = data.notice;
      state.profile.photo = data.photo;
    },
  },
});

export const infoActions = InfoSlice.actions;
export default InfoSlice.reducer;
