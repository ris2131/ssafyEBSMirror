import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../shared/authApi.js";

const initialState = {
  isLoggedIn: false,
  isVisible: false,
};

export const signup = createAsyncThunk(
  "AuthSlice/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.signup(data);
      console.log("data: "+ data);
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
      localStorage.setItem("token", res.headers['authorization']);//token 이 undefined 임.
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


// export const getuser = createAsyncThunk(
//   "AuthSlice/getuser",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await authApi.getuser();
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response);
//     }
//   }
// );

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
    [login.fulfilled]: (state, action) => {
      const {data} = action.payload;
      
      state.isLoggedIn = true;
      state.isVisible = data.hairshop_visible;
      // console.log("fulfilled후 isLoggedIn는 "+state.isLoggedIn);
      console.log("login fulfilled후 state는 "+state.isVisible);
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

export const authActions = authSlice.actions;
export default authSlice.reducer;
