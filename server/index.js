

const connectDb = require("./db/connect");
const dotenv = require("dotenv");
const {app} = require("./app");



dotenv.config();



const start = async () => {
  try {
    await connectDb(process.env.NODE_ENV === 'test' ? process.env.MONGO_URL_TEST : process.env.MONGO_URL);
    const PORT = process.env.PORT || 8500; 
    const server = app.listen(PORT, () => {
      // console.log(`Server is running on port ${PORT}`);
    });
    return server; 
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

if (process.env.NODE_ENV !== 'test') {
  start();
}

const hotStartServer = () => {
  const startServer = setTimeout(() => {
    // console.log("Server started!");
  }, 5000); 

  return startServer;
};

hotStartServer();

module.exports = {  start }; 
