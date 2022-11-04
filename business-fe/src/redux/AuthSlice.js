import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../shared/authApi.js";
// import { imgApi } from "../shared/imgApi";

const initialState = {
  isVisible: false,
};

export const signup = createAsyncThunk(
  "AuthSlice/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.signup(data);
      //localStorage.setItem("token", res.headers.authorization);
      console.log("data: "+data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const login = createAsyncThunk(
  "AuthSlice/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.login(data);
      console.log("res: ",res);
      console.log("res.header: ",res.headers);
      localStorage.setItem("token", res.headers.authorization);//token 이 undefined 임.
      console.log("authrorization: ",res.headers.authorization);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
// 이메일 중복체크
export const checkEmail = createAsyncThunk(
  "AuthSlice/checkEmail",
  async (email, { rejectWithValue }) => {
    try {
      const res = await authApi.checkemail(email);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
//
export const checkReg = createAsyncThunk(
  "AuthSlice/checkReg",
  async(data, {rejectWithValue})=>{
    try{
      const res = await authApi.checkReg(data);
      return res.data;
    } catch(err){
      return rejectWithValue(err.response);
    }
  }
);


export const getuser = createAsyncThunk(
  "AuthSlice/getuser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.getuser();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
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
    [login.fulfilled]: (state) => {
      state.isLoggedIn = true;
    },
  //   [googleLogin.fulfilled]: (state, action) => {
  //     if (action.payload.data) {
  //       state.isLoggedIn = true;
  //     }
  //   },
  //   [googleNickname.fulfilled]: (state) => {
  //     state.isLoggedIn = true;
  //   },
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

export const authActions = authSlice.actions;
export default authSlice.reducer;
