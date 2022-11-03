import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mysubscribe: []
};

const subscribeSlice = createSlice({
    name: "subscribe",
    initialState,
    reducers: {
        setMysubscribe(state, action) {
            state.mysubscribe = action.payload
        },
    },
});
export const {
    setMysubscribe,
} = subscribeSlice.actions;
export default subscribeSlice.reducer;