import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { designerApi } from "../shared/designerApi.js";
// import { imgApi } from "../shared/imgApi";

const initialState = {
  designers: []
};

export const getDesigner = createAsyncThunk(
  "DesignerSlice/designer",
  async (data, { rejectWithValue }) => {
    try {
      const res = await designerApi.getDesigner();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

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
    [getDesigner.fulfilled]: (state, action) => {
      state.designers = action.payload.data;
    },
  },
});

export const designerActions = DesignerSlice.actions;
export default DesignerSlice.reducer;
