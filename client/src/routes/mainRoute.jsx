import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Admin from "../pages/Admin"
import Register from "../pages/SignupPage"
import Login from "../pages/LoginPage"
import ProtectedRoute from "../utills/AdminProtectedRoutes"
import Trainer from "../pages/Trainer"
import SingleCourse from "../pages/SingleCourse"
import UserDetailPage from "../pages/UserDetail"
import About from "../pages/About"
import Header from "../components/Layouts/Headers"
import Footer from "../components/Layouts/Footer"
import Course from "../pages/Course"


export const AllRoute=()=>{
    return(

        <BrowserRouter>
        <Header/>
         <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/courses" element={<Course/>}/>
            <Route path="/trainer/:id" element={<Trainer/>}> </Route>
            <Route path="/course/:id" element={<SingleCourse/>}> </Route>
            <Route path="/dashboard" element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            {/* <Route path="/course" element={<Login/>}/> */}
            <Route path="/userInfo" element={<UserDetailPage/>}/>
            <Route path="/about" element={<About/>}/>
         </Routes>
         <Footer/>
        </BrowserRouter>

    )
}