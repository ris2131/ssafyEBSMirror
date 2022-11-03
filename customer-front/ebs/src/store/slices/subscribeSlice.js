import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mySubscribe: []
};

const subscribeSlice = createSlice({
    name: "subscribe",
    initialState,
    reducers: {
        setSubscribe(state, action) {
            state.mySubscribe = action.payload
        },
    },
});
export const {
    setSubscribe,
} = subscribeSlice.actions;
export default subscribeSlice.reducer;