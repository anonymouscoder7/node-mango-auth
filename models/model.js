const mongoose = require('mongoose');
const dbConfig = require('../config/db');

async function connectToDatabase() {
    try {
        await mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit();
    }
}

const db = {};

// Import and define your models
db.Users = require('./user');

module.exports = { db, connectToDatabase };
