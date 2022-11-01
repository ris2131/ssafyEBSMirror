import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/userSlice';


export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  // 이거 뭔지 모름.
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
});
