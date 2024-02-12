require("dotenv").config();
const User = require("../models/User");
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
        console.log("req.body",req.body)
        const newUser = new User(req.body);
         await newUser.save()
        const token = jwt.sign({ id: newUser._id, email: newUser.email, username: newUser.username ,city:newUser.city,street:newUser.street}, process.env.SECRET_KEY, { expiresIn: "1h" })
        res.status(201).json({ token });
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
const login = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body
        const user = await User.findOne({ email, password });
        if (!user) {
            return res
                .status(401)
                .json({ message: "No user found with the provided credentials" });
        }
        console.log("user",user)
        const token = jwt.sign({ id: user._id, email: user.email, username: user.username ,city:user.city,street:user.street}, process.env.SECRET_KEY, { expiresIn: "1h" })
        return res.status(200).json({ user,token })
    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ error: "User Login failed", message: error.message });
    }
}
module.exports = {
    createUser,
    login
}