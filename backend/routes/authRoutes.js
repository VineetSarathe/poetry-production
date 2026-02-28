import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerAdmin);   // one time use
router.post("/login", loginAdmin);

export default router;
