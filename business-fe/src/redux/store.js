import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
//import InfoReducer from "./EduSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    
    //edu: EduReducer,
  },
});

export default store;