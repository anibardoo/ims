import express from "express";
import { createTeacherController, deleteTeacherController, getAllTeacherController, getOneTeacherController, updateTeacherController } from "../Controllers/teacherController.js";

import { requireSignIn } from "../middlewares/authMiddleware.js";
// router object
const router = express.Router();
//routes
//Get||all teacher
router.get("/get-teachers", requireSignIn, getAllTeacherController);
//Get||single teacher
router.get("/get-teacher/:id", requireSignIn, getOneTeacherController);
//Post||create teacher
router.post("/create-teachers", requireSignIn, createTeacherController);
//Put||update teacher
router.put("/update-teachers/:id", requireSignIn, updateTeacherController);
//Delete||delete teacher
router.delete("/delete-teachers/:id", requireSignIn, deleteTeacherController);

export default router;