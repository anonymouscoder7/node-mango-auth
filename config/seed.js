const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const dbConfig = require('../config/db');

// Function to seed the database with initial data
async function seed() {
    try {
        // Connect to MongoDB
        await mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true });

        // Hash passwords
        const hashedPassword1 = await bcrypt.hash('password', 10);
        const hashedPassword2 = await bcrypt.hash('password', 10);
        const hashedPassword3 = await bcrypt.hash('password', 10);

        // Create users
        await User.create([
            { email: 'admin@gmail.com', role: 'admin', password: hashedPassword1 },
            {  email: 'company@gmail.com', role: 'company', password: hashedPassword2 },
            {  email: 'user@gmail.com', role: 'user', password: hashedPassword3 },
        ]);

        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the connection after seeding
        mongoose.disconnect();
    }
}

// Call the seed function
seed();
