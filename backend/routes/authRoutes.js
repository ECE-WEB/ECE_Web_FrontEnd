const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();
console.log("✅ authRoutes.js loaded"); // Debugging confirmation

// ✅ Login Route
router.post("/login", async (req, res) => {
    console.log("🔍 POST /api/auth/login received"); // Debugging

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        console.log(`🔍 Searching for user with email: '${email}'`);
        console.log(`🔍 MongoDB Query Result:`, user);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.SECRET_KEY || "fallback_secret",
            { expiresIn: "1h" }
        );

        res.status(200).json({ token, role: user.role });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
