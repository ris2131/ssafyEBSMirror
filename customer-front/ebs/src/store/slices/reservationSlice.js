import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reservationApi } from "../../api/reservationApi"

const initialState = {
    myreservation: [],
    designers : []
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

export const getAvailableDesigners = createAsyncThunk(
    "reservationSlice/getAvailableDesigners",
    async(data, {rejectWithValue}) => {
        try{
            
            const res = await reservationApi.getAvailableDesigners(data.seq, data.finalDate);
            console.log(res.data)
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response);
        }
    }
)

export const makeReservation = createAsyncThunk(
    "reservationSlice/makeReservation",
    async(data, {rejectWithValue}) => {
        console.log(data)
        try{
            
            const res = await reservationApi.makeReservation(data);
            console.log(res.data)
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
        },
        [getAvailableDesigners.fulfilled]:(state,action)=>{
            state.designers = action.payload.data;
            console.log(state.designers);
        }
    },
});
export const reservationActions = reservationSlice.actions;
export default reservationSlice.reducer;