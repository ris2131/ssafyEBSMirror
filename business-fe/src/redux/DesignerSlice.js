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

//from imgApi
export const addDesigner = createAsyncThunk(
  "DesignerSlice/add-designer",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await designerApi.addDesigner(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const getDesignerInfo = createAsyncThunk(
  "DesignerSlice/get-designer-info",
  async (designer_seq, { rejectWithValue }) => {
    try {
      const res = await designerApi.getDesignerInfo(designer_seq);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
//from imgApi
export const modifyDesigner = createAsyncThunk(
  "DesignerSlice/modify-designer",
  async (formData, { rejectWithValue }) => {
    try {
      //console.log("mD::"+JSON.stringify(data));
      const res = await designerApi.modifyDesigner(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
export const deleteDesigner = createAsyncThunk(
  "DesignerSlice/delete-designer",
  async (data, { rejectWithValue }) => {
    try {
      const res = await designerApi.deleteDesigner(data);
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
    [getDesignerInfo.fulfilled]: (state, action) => {
      state.designers = action.payload.data;
    },
  },
});

export const designerActions = DesignerSlice.actions;
export default DesignerSlice.reducer;
