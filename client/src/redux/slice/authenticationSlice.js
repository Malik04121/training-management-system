import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8500/api/users/signup",
        userData
      );
      console.log(response,"response")
      return response.data;
    } catch (error) {
      console.log(error,"error");
      if (error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An unexpected error occurred. Please try again.");
      }
    }
  }
);


export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8500/api/users/login",
        userData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An unexpected error occurred. Please try again.");
      }
    }
  }
);


export const addTrainer = createAsyncThunk(
  "user/addTrainer",
  async (trainerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8500/api/users/addTrainer",
        trainerData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to add trainer. Please try again.");
      }
    }
  }
);


export const fetchUsersByRole = createAsyncThunk(
  "user/fetchUsersByRole",
  async (role, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8500/api/users?role=${role}`);
      console.log(response,"response")
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(`Fetching ${role}s failed. Please try again.`);
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userList: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    })


    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    });


    builder.addCase(addTrainer.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(addTrainer.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = "Trainer added successfully!";
    });
    builder.addCase(addTrainer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(fetchUsersByRole.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsersByRole.fulfilled, (state, action) => {
      state.loading = false;
      
      state.userList = action.payload;
      console.log(action.payload,"payload",state.userList);
    });
    builder.addCase(fetchUsersByRole.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const userSuccessMessage = (state) => state.user?.successMessage || null;



export const userLists = (state) => state.user.userList;

export const selectLoading = (state) => state.user.loading ;
export const selectError = (state) => state.user.error ;

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;