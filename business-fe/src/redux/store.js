import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import InfoReducer from "./InfoSlice";
import DesignerReducer from "./DesignerSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    info: InfoReducer,
    designer: DesignerReducer,
    //edu: EduReducer,
  },
});

export default store;