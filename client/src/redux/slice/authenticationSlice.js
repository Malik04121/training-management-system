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
      console.log(response.data,"datea ")
      const { role, name } = response.data.user;


      localStorage.setItem("role", role);
      localStorage.setItem("username", name);
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error,"error inside if ")
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
      console.log(response,"response from user",role)
      return {data:response.data,role};
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(`Fetching ${role}s failed. Please try again.`);
    }
  }
);
export const verifyToken = createAsyncThunk(
  "user/verifyToken",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8500/api/users/verify", {
        withCredentials: true,
      });

      const { role, name } = response.data.user;


      localStorage.setItem("role", role);
      localStorage.setItem("username", name);
console.log(response.data,"data inside verify token");

      return response.data.user;
    } catch (error) {
      return rejectWithValue("Failed to verify token or fetch user details.");
    }
  }
);
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async () => {
    try {
      const response = await axios.get(`http://localhost:8500/api/users/logout`, { withCredentials: true });
      console.log(response,"response")
      localStorage.removeItem("isLogin")
      localStorage.removeItem("username")
      localStorage.removeItem("role")
      return response.data;
    } catch (error) {
      throw new Error(error.message);
      
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userList: [],
    trainerList:[],
    userName:localStorage.getItem("username")||"",
    role:localStorage.getItem("role")||"",
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
      state.userName=""
      state.role=""
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
      console.log(action.payload,"payload error")
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
      if(action.payload.role==="Trainer"){
        state.trainerList=action.payload.data
      }
      else{
        state.userList = action.payload.data;
      }
      console.log(action.payload.role,"payload");
    });
    builder.addCase(fetchUsersByRole.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(verifyToken.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
    });
    builder.addCase(verifyToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user={}
      state.successMessage=action.payload
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    });
  },
});

export const userSuccessMessage = (state) => state.user?.successMessage || null;




export const userLists = (state) => state.user.userList;
export const trainerLists = (state) => state.user.trainerList;
export const singleUser = (state) => state.user.user;

export const username=(state)=>state.user.userName;
export const role=(state)=>state.user.role;

export const selectLoading = (state) => state.user.loading ;
export const selectError = (state) => state.user.error ;

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;