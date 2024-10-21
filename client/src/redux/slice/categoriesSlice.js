import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    try {
      const res = await axios.get("http://localhost:8500/api/category");
      return res.data;
    } catch (error) {

      throw new Error(error.response?.data?.message || error.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (categoryData) => {
    try {
      const res = await axios.post(
        "http://localhost:8500/api/category/",
        categoryData,
        { withCredentials: true } 
      );

      return res.data;
    } catch (error) {

      throw new Error(error.response?.data?.message || error.message);
    }
  }
);
export const deleteCategory=createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8500/api/category/${id}`,
        { withCredentials: true } 
      );

      return res.message;
    } catch (error) {

      throw new Error(error.response?.data?.message || error.message);
    }
  }
)

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
    successMessage: null, 
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    deleteSingleCategory:(state,action)=>{
      state.categories = state.categories.filter(category => category._id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = "Category added successfully!";
      state.categories.push(action.payload); 
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  

  builder.addCase(deleteCategory.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(deleteCategory.fulfilled, (state, action) => {
    state.loading = false;
    state.successMessage = action.message;
  });
  builder.addCase(deleteCategory.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });
  }
});

export const categoryData = (state) => state.category.categories;
export const loadingStatus = (state) => state.category.loading;
export const errorMessage = (state) => state.category.error;
export const successMessage = (state) => state.category.successMessage;

export const { clearMessages,deleteSingleCategory } = categorySlice.actions;

export default categorySlice.reducer;