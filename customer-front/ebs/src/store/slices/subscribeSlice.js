import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { subscribeApi } from "../../api/subscribeApi"

const initialState = {
    mysubscribe: []
};

export const getSubscribe = createAsyncThunk(
    "subscribeSlice/getSubscribe",
    async(data, { rejectWithValue }) => {
        try{
            const res = await subscribeApi.getsubscribeinfo();
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response);
        }
    }
);

const subscribeSlice = createSlice({
    name: "subscribe",
    initialState,
    reducers: {
        
    },
    extraReducers:{
        [getSubscribe.fulfilled]:(state, action) =>{
            state.mysubscribe = action.payload
        }
    },
});
export const subscribeActions = subscribeSlice.actions;
export default subscribeSlice.reducer;