require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(express.json()); // Ensures request bodies are parsed as JSON
app.use(cors()); // Enables CORS for frontend requests

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes.js");
app.use("/api/auth", authRoutes);

// ✅ Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("❌ Error: MONGO_URI is missing in .env file!");
    process.exit(1); // Exit if MONGO_URI is not set
}

console.log(`🔍 Connecting to MongoDB: ${process.env.MONGO_URI}`);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
      console.error("❌ MongoDB Connection Error:", err);
      process.exit(1);
  });
  mongoose.connection.on("connected", () => {
    console.log(`✅ Connected to database: ${mongoose.connection.db.databaseName}`);
});


// ✅ Default Route (for debugging)
app.get("/", (req, res) => {
    res.send("Server is running... 🚀");
});

app._router.stack.forEach((route) => {
    if (route.route && route.route.path) {
        console.log(`✅ Route Loaded: ${route.route.path}`);
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


