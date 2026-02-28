import express from "express";
import {
  addPoem,
  getAllPoems,
  getPoemsByPoet,
  getPoemsByTitle,
  getPoemById,     // ✅ NEW
  updatePoem       // ✅ NEW
} from "../controllers/poemController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Public
router.get("/", getAllPoems);          // ✅ NEW
// 👇 ADD
router.get("/title/:title", getPoemsByTitle);
router.get("/single/:id", getPoemById);
router.get("/:poetId", getPoemsByPoet);

// Admin only
router.post("/add", adminAuth, addPoem);
router.put("/update/:id", adminAuth, updatePoem);
 
export default router;
