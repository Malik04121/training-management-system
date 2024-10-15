import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourse = createAsyncThunk(
  "category/fetchCourse",
  async (categoryId) => {
    try {
      const url = categoryId 
      ? `http://localhost:8500/api/course?categoryId=${categoryId}`
      : "http://localhost:8500/api/course";
      const res = await axios.get(url);

      
      return res.data;
    } catch (error) {

      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

export const fetchSingleCourse = createAsyncThunk(
  "category/fetchSingleCourse",
  async (courseId) => {
    try {
      const url = `http://localhost:8500/api/course/${courseId}`;
      const res = await axios.get(url,{
        withCredentials:true
      });

      
      return res.data;
    } catch (error) {

      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

export const addCourse = createAsyncThunk(
  "category/addCourse",
  async (courseData) => {
    try {
      const res = await axios.post(
        "http://localhost:8500/api/course/addCourse",
        courseData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      return res.data;
    } catch (error) {

      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: [],
    loading: false,
    individualCourse:{},
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
      state.course = action.payload;
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

    builder.addCase(fetchSingleCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.individualCourse=action.payload
    });
    builder.addCase(fetchSingleCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const courseData = (state) => state.course.course;
export const singleCourseData = (state) => state.course.individualCourse;
export const loadingStatus = (state) => state.course.loading;
export const errorMessage = (state) => state.course.error;
export const successMessage = (state) => state.course.successMessage;

export const { clearMessages } = courseSlice.actions;

export default courseSlice.reducer;