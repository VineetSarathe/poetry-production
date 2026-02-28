import express from "express";
import { addPoet, getAllPoets, updatePoet } from "../controllers/poetController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Admin only
router.post("/add", adminAuth, upload.single("image"), addPoet);

// ✅ UPDATE ROUTE (NEW)
router.put("/update/:id", adminAuth, upload.single("image"), updatePoet);

// Public
router.get("/", getAllPoets);

export default router;