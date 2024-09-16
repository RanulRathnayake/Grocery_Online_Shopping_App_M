const mongoose = require('mongoose');
/* const { DB_URL } = require('../config');
 */
const  DB_URL  = 'mongodb+srv://shopping:12345@cluster0.cm3gs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
async function databaseConnection() {

    try {
        await mongoose.connect(DB_URL);
        console.log('Database connected successfully');
        
    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }

    
}

module.exports = { databaseConnection };