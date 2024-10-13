import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slice/authenticationSlice";
import categoriesSlice from "./slice/categoriesSlice";




export const store=configureStore({
    reducer:{
        category:categoriesSlice,
        authentication:userSlice

    }
})