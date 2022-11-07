import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../store/slices/userSlice";
import businessReducer from "../store/slices/businessSlice";
import subscribeReducer from "../store/slices/subscribeSlice";
import reservationReducer from "../store/slices/reservationSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    business: businessReducer,
    subscribe: subscribeReducer,
    reservation: reservationReducer,

  },
});

export default store;
