import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slice/authenticationSlice";
import categoriesSlice from "./slice/categoriesSlice";
import courseSlice from "./slice/courseSlice";
import moduleSlice from "./slice/moduleSlice";




export const store=configureStore({
    reducer:{
        category:categoriesSlice,
        user:userSlice,
        course:courseSlice,
        module:moduleSlice

    }
})