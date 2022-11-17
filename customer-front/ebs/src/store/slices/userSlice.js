import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../api/authApi"
import { Cookies } from "react-cookie";

const initialState = {
    isLoggedIn: false,
    member : {
      nickname: "",
      address : "",
      logintype : "",
    },
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
        const res = await authApi.googlelogin(data);
        if (res.headers.authorization) {
          localStorage.setItem("token", res.headers.authorization);
          localStorage.setItem("nickname", res.data.data.member_nickname)
        }
        return res.data
      } catch (err) {
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
        localStorage.setItem("nickname", res.data.data.member_nickname)
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response);
      }
    }
  );

  export const getuser = createAsyncThunk(
    "userSlice/getuser",
    async (data, { rejectWithValue }) => {
      try {
        const res = await authApi.getuser();
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response);
      }
    }
  );
  
  export const putuser = createAsyncThunk(
    "userSlice/putuser",
    async (data, { rejectWithValue }) => {
      try {
        const res = await authApi.putuser(data);
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response);
      }
    }
  );

  export const quituser = createAsyncThunk(
    "userSlice/quituser",
    async (data, { rejectWithValue }) => {
      try {
        const res = await authApi.quituser();
        localStorage.setItem("token", "");
        localStorage.setItem("nickname", "");
        removeRefreshToken()
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
      [getuser.fulfilled]: (state, action) => {
        const { data } = action.payload;
        state.isLoggedIn = true;
        state.member.nickname = data.member_nickname;
        state.member.address = data.member_address;
        state.member.logintype = data.member_logintype;
      },
      [putuser.fulfilled]: (state) => {
        state.isLoggedIn = true;
      },
      [quituser.fulfilled]: (state) => {
        state.isLoggedIn = false;
      },
    },

});

export const userActions = userSlice.actions;
export default userSlice.reducer;