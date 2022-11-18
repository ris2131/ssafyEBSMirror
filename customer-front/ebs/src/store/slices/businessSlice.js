import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { businessApi } from "../../api/businessApi"


const initialState = {
    isLoggedIn: false,
    mode : 0,
    reservationDate : "",
    hairshopList : [],
    designerList : [],
    hairshop : {
      businessSeq: 0,
      address : "",
      homepage : "",
      name : "",
      notice : "",
      phone : "",
      photo : "",
      description : "",
    },
    designer : {
      designerSeq: 0,
      name: "",
      description: "",
      photo: "",
      businessSeq: 0
    }
};


export const searchByname = createAsyncThunk(
  "businessSlice/searchByname",
  async (data, { rejectWithValue }) => {
    try {
      const res = await businessApi.searchByname(data);
      console.log(res.data)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const getInfo = createAsyncThunk(
  "businessSlice/getInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await businessApi.getInfo(data);
      console.log(res)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const getDesignerInfo = createAsyncThunk(
  "businessSlice/getDesignerInfo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await businessApi.getDesignerInfo(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);



const businessSlice = createSlice({
    name: "business",
    initialState,
    reducers: {
      setMode(state, data){
        state.mode = data;        
    },
      setDate(state, data){
        state.reservationDate= data;
      }
    },
    extraReducers: {
    [searchByname.fulfilled]: (state, action) => {
        const { data } = action.payload;
        state.isLoggedIn = true;     
        state.hairshopList = data.hairshopList ;
      },
      [getInfo.fulfilled]: (state, action) => {
        const { data } = action.payload;
        state.isLoggedIn = true;     
        state.hairshop.businessSeq = data.hairshopVo.businessSeq 
        state.hairshop.address = data.hairshopVo.address 
        state.hairshop.homepage = data.hairshopVo.homepage 
        state.hairshop.name = data.hairshopVo.name 
        state.hairshop.notice = data.hairshopVo.notice 
        state.hairshop.phone = data.hairshopVo.phone 
        state.hairshop.description = data.hairshopVo.description
        state.hairshop.photo = data.hairshopVo.photo         
      },    
      [getDesignerInfo.fulfilled]: (state, action) => {
        const { data } = action.payload;
        state.isLoggedIn = true;   
        state.designerList = data.designerList;
        // state.designer.designerSeq = data.designerList[0].designerSeq 
        // state.designer.name = data.designerList[0].name 
        // state.designer.description = data.designerList[0].description 
        // state.designer.photo = data.designerList[0].photo 
        // state.designer.businessSeq = data.designerList[0].businessSeq 
      },    
    },

});

export const businessActions = businessSlice.actions;
export default businessSlice.reducer;