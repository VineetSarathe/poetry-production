import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import poetRoutes from "./routes/poetRoutes.js";
import poemRoutes from "./routes/poemRoutes.js";
import adminAuth from "./middleware/adminAuth.js";
import posterRoutes from "./routes/posterRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

// ⭐ IMAGE ACCESS
app.use("/uploads", express.static("uploads"));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/poets", poetRoutes);
app.use("/api/poems", poemRoutes);
app.use("/api/posters", posterRoutes);

app.get("/api/admin-test", adminAuth, (req, res) => {
  res.json({ message: "Admin middleware working" });
});

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});