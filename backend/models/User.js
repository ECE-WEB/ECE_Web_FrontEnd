const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Student", "Faculty", "Admin"], default: "Student" }
});

module.exports = mongoose.model("User", userSchema);
