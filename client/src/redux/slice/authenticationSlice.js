import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let baseURL = import.meta.env.VITE_BASE_URL;

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/users/signup`,
        userData
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


export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/users/login`,
        userData,
        { withCredentials: true }
      );

      const { role, name } = response.data.user;


      localStorage.setItem("role", role);
      localStorage.setItem("username", name);
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {

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
        `${baseURL}/users/addTrainer`,
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
  async ({ role, page, limit }={}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/users`,{
        params:{role,page,limit}
      })
      return { data: response.data.data, role, currentPage: response.data.currentPage, totalPages: response.data.totalPages };
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
      const response = await axios.get(`${baseURL}/users/verify`, {
        withCredentials: true,
      });

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
export const checkToken = createAsyncThunk(
  "user/checkToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/users/verifyToken`,{withCredentials:true});
      return response.data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(`Fetching ${role}s failed. Please try again.`);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async () => {
    try {
      const response = await axios.get(`${baseURL}/users/logout`, { withCredentials: true });

      localStorage.removeItem("isLogin")
      localStorage.removeItem("username")
      localStorage.removeItem("role")
      return response.data;
    } catch (error) {
      throw new Error(error.message);
      
    }
  }
);

export const addCourseToUser = createAsyncThunk(
  'user/addCourse',
  async ({ userId, courseId, trainerId }, { rejectWithValue }) => {
    try {

      const response = await axios.patch(`${baseURL}/users/${userId}/courses`, { courseId, trainerId }, { withCredentials: true });

      return response.data;
    } catch (error) {

      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/users/loginUserData`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch user details.");
    }
  }
);
export const deleteUser=createAsyncThunk(
  "category/deleteUser",
  async (id) => {
    try {
      const res = await axios.delete(
        `${baseURL}/users/${id}`,
        { withCredentials: true } 
      );

      return res.message;
    } catch (error) {

      throw new Error(error.response?.data?.message || error.message);
    }
  }
)


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
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
    deleteSingleUser:(state,action)=>{
      state.userList = state.userList.filter(user => user._id !== action.payload);
    }
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
      if(action.payload.role==="Trainer"){
        state.trainerList=action.payload.data
      }
      else{
        state.userList = action.payload.data;
      }

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

      state.user = action.payload.data.user;
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


    builder.addCase(addCourseToUser.pending, (state) => {
      state.loading = true;
      
      state.error = null;
    });
    builder.addCase(addCourseToUser.fulfilled, (state, action) => {
      state.loading = false;
        state.userList = action.payload.data;
    });
    builder.addCase(addCourseToUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      
      state.loading = false;
      state.user = action.payload.data; 
    });
    
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(checkToken.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("role",action.payload.data.user.role)
      localStorage.setItem("userName",action.payload.data.user.name)
      localStorage.setItem("isLogin",true)
      state.user = action.payload.data.user;
    });
    builder.addCase(checkToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      
      state.loading = false;
      state.message = action.payload; 
    });
    
    builder.addCase(deleteUser.rejected, (state, action) => {
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

export const { clearUserState,deleteSingleUser } = userSlice.actions;
export default userSlice.reducer;