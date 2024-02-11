require("dotenv").config();
const User = require("../models/User");
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
         await newUser.save()
        // const token = jwt.sign({ id: newUser._id, email: newUser.email, username: newUser.username}, process.env.SECRET_KEY, { expiresIn: "1h" })
        res.status(201).json({ message:"created" });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
            res.status(400).json({ error: "Username is already taken", field: "username",message:"Username is already taken" });
        } else if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ error: "Validation failed", validationErrors ,message: "email already exists" });
        } else {
            res.status(500).json({ error: "User creation failed", message: error.message });
        }
    }
}

module.exports = {
    createUser,
}