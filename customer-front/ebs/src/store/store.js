import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/slices/userSlice";
import subscribeReducer from "../store/slices/subscribeSlice";
import reservationReducer from "../store/slices/reservationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    subscribe: subscribeReducer,
    reservation: reservationReducer,
  },
});

export default store;
