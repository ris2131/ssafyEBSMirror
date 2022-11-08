import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import AuthReducer from "./AuthSlice";
import InfoReducer from "./InfoSlice";
import DesignerReducer from "./DesignerSlice";

const reducers = combineReducers({
  auth: AuthReducer,
  info: InfoReducer,
  designer: DesignerReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

// const store = configureStore({
//   reducer: {
//     auth: AuthReducer,
//     info: InfoReducer,
//     designer: DesignerReducer,
//   },
// });
export default store;