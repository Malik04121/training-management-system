import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourse = createAsyncThunk(
  "category/fetchCourse",
  async () => {
    try {
      const res = await axios.get("http://localhost:8500/api/category");
      return res.data;
    } catch (error) {
      console.log(error, "error");
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

export const addCourse = createAsyncThunk(
  "category/addCourse",
  async (courseData) => {
    try {
      const res = await axios.post(
        "http://localhost:8500/api/category/",
        courseData,
        { withCredentials: true } 
      );
      console.log(res)
      return res.data;
    } catch (error) {
      console.log(error, "error");
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: [],
    loading: false,
    error: null,
    successMessage: null, 
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = "Category added successfully!";
      state.course.push(action.payload); 
    });
    builder.addCase(addCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const courseData = (state) => state.course.course;
export const loadingStatus = (state) => state.course.loading;
export const errorMessage = (state) => state.course.error;
export const successMessage = (state) => state.course.successMessage;

export const { clearMessages } = courseSlice.actions;

export default courseSlice.reducer;