import express from "express";
import { addPoster, getPosters, updatePoster, deletePoster } from "../controllers/posterController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/add", adminAuth, upload.single("image"), addPoster);
router.get("/", getPosters);
router.put("/:id", adminAuth, upload.single("image"), updatePoster);   // ✅ IMPORTANT
router.delete("/:id", adminAuth, deletePoster);

export default router;
