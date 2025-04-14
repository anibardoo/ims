import mongoose from "mongoose";
import Enroll from "../models/EnrollModel.js";
import Course from "../models/CoursesModel.js";
import Student from "../models/StudentModel.js";
import Teacher from "../models/TeachersModel.js";

export const enrollController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { studentId, teacherId, courseId } = req.body;

    // Check if the course exists
    const course = await Course.findById(courseId).session(session);
    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }

    // Check if the student exists
    const student = await Student.findById(studentId).session(session);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    // Check if the teacher exists
    const teacher = await Teacher.findById(teacherId).session(session);
    if (!teacher) {
      return res.status(404).send({ message: "Teacher not found" });
    }

    // Create a new enrollment
    const enrollment = new Enroll({
      student: studentId,
      teacher: teacherId,
      course: courseId,
    });

    await enrollment.save({ session });
    //update the course with the new enrollment
    if (course.students.includes(studentId)) {
      course.students.push(studentId);
      await course.save({ session });
    }

    //update the student with the new enrollment
    if (student.courses.includes(courseId)) {
      student.courses.push(courseId);
      await student.save({ session });
    }
    //update the teacher with the new enrollment
    if (teacher.courses.includes(courseId)) {
      teacher.courses.push(courseId);
      await teacher.save({ session });
    }
    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    res
      .status(201)
      .send({ success: true, message: "Enrollment successful", enrollment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
