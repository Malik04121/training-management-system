import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchModule = createAsyncThunk(
  "module/fetchModule",
  async () => {
    try {
      const res = await axios.get("http://localhost:8500/api/module");

      return res.data;
    } catch (error) {

      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

export const addModule = createAsyncThunk(
  "module/addModule",
  async (moduleData) => {
    try {
      const res = await axios.post(
        "http://localhost:8500/api/module/addModule",
        moduleData,
        { withCredentials: true } 
      );

      return res.data;
    } catch (error) {

      throw new Error(error.response?.data?.message || error.message);
    }
  }
);
export const deleteCourseModule=createAsyncThunk(
  "category/deleteCourseModule",
  async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8500/api/module/${id}`,
        { withCredentials: true } 
      );

      return res.message;
    } catch (error) {

      throw new Error(error.response?.data?.message || error.message);
    }
  }
)

const moduleSlice = createSlice({
  name: "module",
  initialState: {
    module: [],
    loading: false,
    error: null,
    successMessage: null, 
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    deleteModule:(state,action)=>{
      state.module = state.module.filter(module => module._id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchModule.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchModule.fulfilled, (state, action) => {
      state.loading = false;
      state.module = action.payload;
    });
    builder.addCase(fetchModule.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addModule.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addModule.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = "Module added successfully!";

      state.module.push(action.payload); 
    });
    builder.addCase(addModule.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });


    builder.addCase(deleteCourseModule.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCourseModule.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.message;

    });
    builder.addCase(deleteCourseModule.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const moduleData = (state) => state.module.module;
export const moduleLoading = (state) => state.module.loading;
export const moduleError = (state) => state.module.error;
export const successMessage = (state) => state.module.successMessage;

export const { clearMessages,deleteModule } = moduleSlice.actions;

export default moduleSlice.reducer;