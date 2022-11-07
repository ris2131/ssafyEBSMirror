import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reservationApi } from "../../api/reservationApi"

const initialState = {
    myreservation: []
};

export const getreservations = createAsyncThunk(
    "reservationSlice/getreservations",
    async(data, { rejectWithValue }) => {
        try{
            const res = await reservationApi.getreservations();
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response);
        }
    }
)


const reservationSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {
        
    },
    extraReducers:{
        [getreservations.fulfilled]:(state, action) =>{
            state.myreservation = action.payload.data;
            console.log(state.myreservation.data);
        }
    },
});
export const reservationActions = reservationSlice.actions;
export default reservationSlice.reducer;