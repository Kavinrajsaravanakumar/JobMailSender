const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.js");

authRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password is Required" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "email already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, "password": hashedPassword });

        res.status(201).json({ newUser, type: "success" });
    } catch (err) {
        res.status(400).json({ message: err.message, type: "error" });
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password is Required" });
        }
        const user = await User.findOne({ email });
        const passMatch = await bcrypt.compare(password, user.password);

        if (!passMatch) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "10m" }
        );
        res.status(200).json({ message: "User logged in successfully", token: token, type: "success" });
    } catch (err) {
        res.status(400).json({ message: err.message, type: "error" });
    }
});

module.exports = authRouter;