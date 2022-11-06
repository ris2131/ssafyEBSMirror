import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/slices/userSlice"
import businessReducer from "../store/slices/businessSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    business: businessReducer,
  },
});

export default store;
