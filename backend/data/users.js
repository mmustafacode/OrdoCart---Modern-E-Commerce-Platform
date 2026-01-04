import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'; // Import dotenv to use process.env.JWT_SECRET if needed, though simpler to use hardcoded hash for seed

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // Will be hashed in seeder or model hook
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false,
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        isAdmin: false,
    },
];

export default users;
