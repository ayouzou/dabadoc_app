require("dotenv").config();
const User = require("../models/User");
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save()
        const token = jwt.sign({ id: newUser._id, email: newUser.email, username: newUser.username, city: newUser.city, street: newUser.street }, process.env.SECRET_KEY, { expiresIn: "1h" })
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error creating user:', error);

    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email, password });
        if (!user) {
            return res
                .status(401)
                .json({ message: "No user found with the provided credentials" });
        }
        const token = jwt.sign({ id: user._id, email: user.email, username: user.username, city: user.city, street: user.street }, process.env.SECRET_KEY, { expiresIn: "1h" })
        return res.status(200).json({ user, token })
    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ error: "User Login failed", message: error.message });
    }
}


const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error getting user by ID:", error);
        res.status(500).json({ message: "Failed to get user by ID" });
    }
};
module.exports = {
    getUserById
};

module.exports = {
    createUser,
    login,
    getUserById
}