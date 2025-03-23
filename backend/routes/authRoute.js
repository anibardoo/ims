import express from "express";
import {
  loginController,
  registerController,
  testController,
} from "../Controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
// import upload from '../middlewares/upload.js';
// router object
const router = express.Router();

// register route||POST
router.post("/register", registerController);

// Login Routes|| POST
router.post("/login", loginController);

//test route
router.get("/test", requireSignIn, testController);

export default router;
