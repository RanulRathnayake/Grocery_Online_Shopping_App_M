const mongoose = require('mongoose');
/* const { DB_URL } = require('../config');
 */
const  DB_URL  = 'mongodb+srv://product:12345@cluster0.rwpdd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
async function databaseConnection() {

    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Db Connected');
        
    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }

    console.log('Database connected successfully');
}

module.exports = { databaseConnection };