const express = require("express");
const connectDb = require("./db/connect");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const courseRoute = require("./routes/coursesRoute");
const courseModuleRoute = require("./routes/courseModuleRoute");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow all origins but dynamically set the Access-Control-Allow-Origin to the incoming origin
    callback(null, origin);
  },
  credentials: true,  // Allow credentials (cookies)
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoute);
app.use("/api/course", courseRoute);
app.use("/api/module", courseModuleRoute);

// Connect to Database and Start Server
const start = async () => {
  try {
    await connectDb(process.env.NODE_ENV === 'test' ? process.env.MONGO_URL_TEST : process.env.MONGO_URL);
    const PORT = process.env.PORT || 8500; // Use the PORT variable or default to 8500
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

start();

module.exports = app; // Export the app for testing purposes
