const express = require('express');
const { databaseConnection } = require('./database/connection.js');

const app = express();

async function startServer() {
    try {
        await databaseConnection(); 

        app.use(express.json());

        app.get('/', (req, res, next) => {
            return res.status(200).json({ message: 'shopping service' });
        });

        app.listen(8003, () => {
            console.log('Shopping Server is running on port 8003');
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); 
    }
}

startServer(); 
