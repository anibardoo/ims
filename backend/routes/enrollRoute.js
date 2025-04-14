import express from "express";
import { enrollController } from "../Controllers/enrollController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Enroll route
router.post("/enroll", requireSignIn, enrollController);
export default router;

