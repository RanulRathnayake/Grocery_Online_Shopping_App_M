const express = require('express');
const { databaseConnection } = require('./src/database/connection.js');

const app = express();

async function startServer() {
    try {
        await databaseConnection(); 

        app.use(express.json());

        app.get('/', (req, res, next) => {
            return res.status(200).json({ message: 'customer service' });
        });

        app.listen(8001, () => {
            console.log('Server is running on port 8001');
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit the process with a failure code
    }
}

startServer(); // Call the async function to start the server
