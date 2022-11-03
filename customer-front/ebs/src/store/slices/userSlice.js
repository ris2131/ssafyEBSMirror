import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../api/authApi"
import { Cookies } from "react-cookie";

const initialState = {
    isLoggedIn: false,
};

const cookies = new Cookies();

export const setRefreshToken = (refreshToken) => {
  return cookies.set("refresh_token", refreshToken, {
    sameSite: "strict",
    path: "/",
  });
};

export const getRefreshToken = () => {
  return cookies.get("refresh_token");
};

export const removeRefreshToken = () => {
  return cookies.remove("refresh_token");
};


  export const googleLogin = createAsyncThunk(
    "userSlice/googleLogin",
    async (data, { rejectWithValue }) => {
      try {
        console.log("!!!!!!!!!!!")
        const res = await authApi.googlelogin(data);
        console.log(res)
        if (res.headers.authorization) {
          localStorage.setItem("token", res.headers.authorization);
        }
        return res.data
      } catch (err) {
        console.log("@@@@@@@@@@@@@")
        return rejectWithValue(err.response);
      }
    }
  );

  export const googleNickname = createAsyncThunk(
    "userSlice/googleNickname",
    async (data, { rejectWithValue }) => {
      try {
        const res = await authApi.googlesignup(data);
        localStorage.setItem("token", res.headers.authorization);
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response);
      }
    }
  );

  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout(state){
            state.isLoggedIn = false;
        },
        reload(state){
            state.isLoggedIn = true;
        }
    },
    extraReducers: {
      [googleLogin.fulfilled]: (state, action) => {
        if (action.payload.data) {
          console.log(action)
          state.isLoggedIn = true;
        }
      },
      [googleNickname.fulfilled]: (state) => {
        state.isLoggedIn = true;
      },
    },

});

export const userActions = userSlice.actions;
export default userSlice.reducer;