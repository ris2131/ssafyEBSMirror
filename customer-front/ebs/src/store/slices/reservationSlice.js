import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reservationApi } from "../../api/reservationApi"
import { imgApi } from "../../api/imgApi";

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
//from imgApi
export const addReservationPhoto= createAsyncThunk(
    "reservationSlice/addReservationPhoto",
    async(formData, { rejectWithValue }) => {
        try{
            const res = await imgApi.addReservationPhoto(formData);
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
            console.log("resdata:"+state.myreservation);
        },
        [addReservationPhoto.fulfilled]:(state, action)=>{
            //state.myreservation = 
            //state.myreservation.reservation_photo_list;
            // 너가 보내주는 res_seq를 받아서 => 마이레저베이션을 뚜까열어서 -> seq 가 같은 녀석에다가 -> 너가 보내주는 url 을 집어넣어야함.
            // console.log("res_seq"+action.payload.data.reservation_seq)
            // action.payload.data.reservation_seq
            // action.payload.data.photo
            // 
            // state.myreservation.
                    //"reservation_seq":1,
                    //"designer_name":"개시애기",
                    //"hairshop_name":"쌈봉육발소분점",
                    //"business_seq":6,"reservation_date":"2022-11-20T16:00:00.000+09:00",
                    //"reservation_photo_list":
                        //["https://www.ssafy-ebs.com/download/profile.jpg","https://www.ssafy-ebs.com/download/profile.jpg"],
                    //"reservation_style":"만나서 디자인 협의",
                    //"reservation_service":"잘 부탁드려요^^.",
                    //"reservation_etc":"방금 구독 다시했음 좋아요."
            // state.myreservation
            //
            //console.log(state.myreservation.reservation_seq)

        },
        [getAvailableDesigners.fulfilled]:(state,action)=>{
            state.designers = action.payload.data;
            console.log(state.designers);
        }
    },
});
export const reservationActions = reservationSlice.actions;
export default reservationSlice.reducer;