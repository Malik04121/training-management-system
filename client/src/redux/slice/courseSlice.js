import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let baseURL = import.meta.env.VITE_BASE_URL;



export const fetchCourse = createAsyncThunk(
  "category/fetchCourse",
  async ({ categoryId, search, page, limit }={}) => {
    try {
    console.log(page,"page inside slice")
      const response = await axios.get(`${baseURL}/course`, {
        params: { categoryId, search, page, limit },
      });
      console.log(response,"response from course")
      return { data: response.data.courses,  currentPage: response.data.currentPage, totalPages: response.data.totalPages };

      // return response.data.courses;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

export const fetchFillterCourse = createAsyncThunk(
  "category/fetchFillterCourse",
  async ({ categoryId, search }) => { 
   
    try {
      const params = new URLSearchParams();

      if (categoryId) {
        params.append('categoryId', categoryId);
      }
      if (search) {
        params.append('search', search);
      }

      const url = `${baseURL}/course?${params.toString()}`; 
      const res = await axios.get(url);
      

      return res.data.courses;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

export const fetchSingleCourse = createAsyncThunk(
  "category/fetchSingleCourse",
  async (courseId) => {
    try {
      const url = `${baseURL}/course/${courseId}`;
      const res = await axios.get(url,{
        withCredentials:true
      });
     
    // console.log(res,"singleCourse ");
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
        `${baseURL}/course/addCourse`,
        courseData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
// console.log(res,"courseData")
      return res.data;
    } catch (error) {
// console.log(error,"error inside add course")
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);
export const deleteCourse=createAsyncThunk(
  "category/deleteCourse",
  async (id) => {
    try {
      const res = await axios.delete(
        `${baseURL}/course/${id}`,
        { withCredentials: true } 
      );

      return res.message;
    } catch (error) {

      throw new Error(error.response?.data?.message || error.message);
    }
  }
)

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
    clearState:(state)=>{
       state.individualCourse={},
        state.successMessage=null,
        state.error=null
    },
    deleteSingleCourse:(state,action)=>{
      state.course = state.course.filter(course => course._id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.course = action.payload.data;
    });
    builder.addCase(fetchCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchFillterCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFillterCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.course = action.payload;
    });
    builder.addCase(fetchFillterCourse.rejected, (state, action) => {
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

    builder.addCase(deleteCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      state.loading = false;
      // state.successMessage=action.payload
    });
    builder.addCase(deleteCourse.rejected, (state, action) => {
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

export const { clearMessages ,deleteSingleCourse,clearState} = courseSlice.actions;

export default courseSlice.reducer;