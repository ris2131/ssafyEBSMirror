import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { designerApi } from "../shared/designerApi.js";
// import { imgApi } from "../shared/imgApi";

const initialState = {
  
};

export const addDesigner = createAsyncThunk(
  "DesignerSlice/add-designer",
  async (data, { rejectWithValue }) => {
    try {
      const res = await designerApi.addDesigner(data);
      
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const DesignerSlice = createSlice({
  name: "designer",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
    },
    reload(state) {
      state.isLoggedIn = true;
    },
  },
  extraReducers: {
  
  },
});

export const designerActions = DesignerSlice.actions;
export default DesignerSlice.reducer;
