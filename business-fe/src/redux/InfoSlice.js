import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../shared/authApi.js";
import { infoApi } from "../shared/infoApi.js";
// import { imgApi } from "../shared/imgApi";

const initialState = {
  isLoggedIn: false,
  
  profile: {
    name:"",
    phone:"",
    address:"",
    homepage:"",
    description:"",
    notice:"",
  },
};

export const getinfo = createAsyncThunk(
  "InfoSlice/getinfo",
  async (data, {rejectWithValue}) => {
    try {
      console.log("getinfo start")
      const res = await infoApi.getinfo();
      //const res = await authApi.login(data);
      //console.log("authrorization: ",res.headers.authorization);
      console.log("getInfo done");
      console.log(res.data.data)
      return res.data;
    } catch (err) {
      console.log("getInfo err");
      console.error(err);
      return rejectWithValue(err.response);
    }
  }
);
export const modifyinfo = createAsyncThunk(
  "InfoSlice/modifyinfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await infoApi.modifyinfo(data);
      //localStorage.setItem("token", res.headers.authorization);
      console.log("data: "+data);
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
  //   [signup.fulfilled]: (state) => {
  //     state.isLoggedIn = true;
  //   },
    // [login.fulfilled]: (state) => {
    //   state.isLoggedIn = true;
    // },
  //   [googleLogin.fulfilled]: (state, action) => {
  //     if (action.payload.data) {
  //       state.isLoggedIn = true;
  //     }
  //   },
  //   [googleNickname.fulfilled]: (state) => {
  //     state.isLoggedIn = true;
  //   },
    [getinfo.fulfilled]: (state, action) => {
      const {data} = action.payload;
      state.isLoggedIn = true;
      state.profile.name = data.name;
      state.profile.phone = data.phone;
      state.profile.address = data.address;
      state.profile.homepage = data.homepage;
      state.profile.description = data.description;
      state.profile.notice = data.notice;
    },
  //   [getuser.fulfilled]: (state, action) => {
  //     const { data } = action.payload;
  //     state.isLoggedIn = true;
  //     state.user.nickname = data.nickname;
  //     state.user.email = data.email;
  //     state.user.userImg = data.picturePath;
  //     state.user.birth = data.birth_YMD;
  //     state.user.provider = data.provider;
  //   },
  },
});

export const infoActions = InfoSlice.actions;
export default InfoSlice.reducer;
