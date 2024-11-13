const cron = require('node-cron');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

let  backend_url = process.env.BACKEND_URL;


const startServer=()=>{


cron.schedule('* * * * *', async () => {
    
  try {
    const response = await axios.get(`${backend_url}/ping`);
    console.log(`Pinged ${url} - Status: ${response.status}`);
  } catch (error) {
    console.error(`Error pinging ${url}:`, error.message);
  }
});
}
module.exports={startServer}
