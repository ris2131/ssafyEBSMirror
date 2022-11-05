import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import InfoReducer from "./InfoSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    info: InfoReducer,
    //edu: EduReducer,
  },
});

export default store;