


const express=require("express")
const connectDb = require("./db/connect")
const dotenv=require("dotenv")
const cors=require("cors")
const cookieParser = require("cookie-parser")
const userRoutes=require("./routes/userRoute")
const categoryRoute=require("./routes/categoryRoute")
const courseRoute=require("./routes/coursesRoute")
const courseModuleRoute=require("./routes/courseModuleRoute")
const { verifyTokenAndRole } = require("./controller/userController")


dotenv.config()


const app=express()
app.use(cors({
  origin: function (origin, callback) {
    // Allow all origins but dynamically set the Access-Control-Allow-Origin to the incoming origin
    callback(null, origin);
  },
  credentials: true,  // Allow credentials (cookies)
}));
app.use(express.json())
app.use(cookieParser())

app.use("/api/users",userRoutes)
app.use("/api/category",categoryRoute)
app.use("/api/course",courseRoute)
app.use("/api/module",courseModuleRoute)

app.get('/auth/verify', verifyTokenAndRole);



const start=async()=>{
  try { 
      await connectDb(process.env.MONGO_URL)
      app.listen(8500,()=>
        console.log("server is running on port 8500")
    )
    
  } catch (error) {
    console.log(error)
  }
}

start()

