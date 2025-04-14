import express from 'express';
import { createCourseController, deleteCourseController, getAllCoursesController, getOneCourseController, updateCourseController } from '../Controllers/courseController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';
// router object
const router = express.Router();
//routes
//Get||all course
router.get('/get-courses', requireSignIn, getAllCoursesController);
//Get||single course
router.get('/get-course/:id', requireSignIn, getOneCourseController);
//Post||create course
router.post('/create-course', requireSignIn, createCourseController);
//Put||update course
router.put('/update-course/:id', requireSignIn, updateCourseController);
//Delete||delete course
router.delete('/delete-course/:id', requireSignIn, deleteCourseController);

export default router;