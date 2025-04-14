import express from 'express';

import { createController, deleteController, getAllController, getOneController, updateController } from '../Controllers/studentController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';
// router object
const router = express.Router();

//routes
//Get||all student
router.get('/get-students', requireSignIn, getAllController);
//Get||single student
router.get('/get-student/:id', requireSignIn, getOneController);

//Post||create student
router.post('/create-students', requireSignIn, createController);
//Put||update student
router.put('/update-students/:id', requireSignIn, updateController);

//Delete||delete student
router.delete('/delete-students/:id', requireSignIn, deleteController);


 export default router;
