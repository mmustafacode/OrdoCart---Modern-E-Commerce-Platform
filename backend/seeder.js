import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import bcrypt from 'bcryptjs';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Product.deleteMany();

        // Hash passwords 
        const usersWithHashedPasswords = await Promise.all(users.map(async (user) => {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(user.password, salt);
            return { ...user, password };
        }));

        // Create users
        const createdUsers = await User.insertMany(usersWithHashedPasswords);

        // Get admin user
        const adminUser = createdUsers[0]._id;

        // Add admin user reference to each product
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        // Insert products
        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
