const express = require("express");
const bcrypt = require("bcryptjs");

const UserRouter = express.Router();
const User = require("../models/User.js");
const protect = require("../middleware/auth.js");

UserRouter.get("/", protect, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({ error: err });
    }
});

UserRouter.get("/:id", protect, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: err });
    }
});

UserRouter.post("/", protect, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ error: "Name, email and password data is required" });
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, "password": hashpassword });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

UserRouter.put("/:id", protect, async (req, res) => {

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
});

UserRouter.delete("/:id", protect, async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({ error: "user not found" });
    }
    res.status(204).json({ message: "user deleted successfully"});
});

module.exports = UserRouter;