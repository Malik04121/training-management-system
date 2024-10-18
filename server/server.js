const http = require('http');
const app = require('./index');
const { connectDb } = require('./db/connect');
require("dotenv").config();

let server;
const PORT = process.env.PORT || 8080;

const startServer = async () => {
    if (server) {
        console.log('Server is already running.');
        return; // Prevent starting a new instance
    }

    server = http.createServer(app);
    
    await new Promise((resolve, reject) => {
        server.listen(PORT, async () => {
            try {
                await connectDb;
                console.log("Connected to DB");
                console.log(`Running at port ${PORT}`);
                resolve();
            } catch (error) {
                console.error("Error while connecting to DB:", error);
                reject(error);
            }
        });
    });
};
const closeServer = () => {
    return new Promise((resolve) => {
        if (server) {
            server.close((err) => {
                if (err) {
                    console.error('Error closing server:', err);
                } else {
                    console.log('Server closed');
                }
                server = null; // Reset server variable
                resolve();
            });
        } else {
            console.log('Server is not running.');
            resolve();
        }
    });
};

module.exports = { startServer, closeServer };