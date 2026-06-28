import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();   // <-- YE SABSE UPAR HONA CHAHIYE

import connectDB from "./config/db.js";
import issueRoutes from "./routes/issueRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/issues", issueRoutes);
app.use("/api/ai", aiRoutes);
app.use("/uploads", express.static("uploads"));

// Test Route
app.get("/", (req, res) => {
  res.send("CivicHero AI Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});