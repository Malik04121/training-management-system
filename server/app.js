



const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const courseRoute = require("./routes/coursesRoute");
const courseModuleRoute = require("./routes/courseModuleRoute");
const { startServer } = require("./utils/cronjobColdStaart");



const app = express();


app.use(cors({
  origin: function (origin, callback) {
    callback(null, origin);
  },
  credentials: true,  
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoute);
app.use("/api/course", courseRoute);
app.use("/api/module", courseModuleRoute);

app.use("/api/ping", (req, res) => {
  res.status(200).json({ message: "server is restart" });
});


module.exports = { app }; 