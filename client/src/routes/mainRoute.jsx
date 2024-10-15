import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Courses from "../pages/Courses"
import Admin from "../pages/Admin"
import Register from "../pages/SignupPage"
import Login from "../pages/LoginPage"
import ProtectedRoute from "../utills/AdminProtectedRoutes"
import Header from "../components/Headers"
import Trainer from "../pages/Trainer"
import SingleCourse from "../pages/SingleCourse"


export const AllRoute=()=>{
    return(

        <BrowserRouter>
        <Header/>
         <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="/trainer/:id" element={<Trainer/>}> </Route>
            <Route path="/course/:id" element={<SingleCourse/>}> </Route>
            <Route path="/dashboard" element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
         </Routes>
        </BrowserRouter>
    )
}