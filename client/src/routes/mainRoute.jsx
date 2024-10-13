import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Courses from "../pages/Courses"
import Admin from "../pages/Admin"
import Register from "../pages/SignupPage"
import Login from "../pages/LoginPage"
import ProtectedRoute from "../utills/AdminProtectedRoutes"


export const AllRoute=()=>{
    return(
        <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="/dashboard" element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>

         </Routes>
        </BrowserRouter>
    )
}