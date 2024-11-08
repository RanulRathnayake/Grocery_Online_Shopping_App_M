const express = require('express');
const { databaseConnection } = require('./database/connection.js');
const expressApp = require('./express-app.js');

const app = express();

async function startServer() {
    try {
        await databaseConnection(); 

        app.use(express.json());

        await expressApp(app)
        
        app.get('/', (req, res, next) => {
            return res.status(200).json({ message: 'customer service' });
        });

        app.listen(8001, () => {
            console.log('Customer Server is running on port 8001');
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); 
    }
}

startServer(); 
