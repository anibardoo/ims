import mongoose from "mongoose";
import CoursesModel from "../models/CoursesModel.js";
import StudentModel from "../models/StudentModel.js";
import TeacherModel from "../models/TeachersModel.js";

export const getAllCoursesController = async (req, res) => {
    try {
        const courses = await CoursesModel.find({});
        res.status(200).send({
            success: true,
            message: "All Courses List",
            data: courses,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in getting all courses",
            error,
        });
    }
}
export const getOneCourseController = async (req, res) => {
    try {
        const course = await CoursesModel.findById(req.params.id);
        if (!course) {
            return res.status(404).send({
                success: false,
                message: "Course not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Single Course Data",
            data: course,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in getting course",
            error,
        });
    }
}
export const createCourseController = async (req, res) => {
    try {
        const { courseName, courseCode, courseDuration, courseDescription,teacher, student } = req.body;
        if (!courseName || !courseCode || !courseDuration || !courseDescription || !teacher || !student) {
            return res.status(400).send({
                success: false,
                message: "Please provide all required fields",
            });
        }

        // Check if teacher exists
        const teacherExists = await TeacherModel.findById(teacher);
        if (!teacherExists) {
            return res.status(400).send({
                success: false,
                message: "Teacher not found",
            });
        }
        // Check if students exist
        const students = await StudentModel.find({ _id: { $in: student } });
        if (students.length !== student.length) {
            return res.status(400).send({
                success: false,
                message: "Some students not found",
            });
        }
        const newCourse = new CoursesModel(courseName, courseCode, courseDuration, courseDescription, teacher, student);
        const session = await mongoose.startSession();
        session.startTransaction();
        // Save the course
        await newCourse.save({ session });  
        // Update the teacher's courses array
        teacherExists.courses.push(newCourse._id);
        await teacherExists.save({ session });
        // Update the students' courses array
        for (const studentId of student) {
            const studentExists = await StudentModel.findById(studentId);
            if (studentExists) {
                studentExists.course.push(newCourse._id);
                await studentExists.save({ session });
            }
        }
        await session.commitTransaction();
        session.endSession();
        res.status(201).send({
            success: true,
            message: "Course Created Successfully",
            data: newCourse,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in creating course",
            error,
        });
    }
}
export const updateCourseController = async (req, res) => {
    try {
        const updatedCourse = await CoursesModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCourse) {
            return res.status(404).send({
                success: false,
                message: "Course not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Course Updated Successfully",
            data: updatedCourse,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in updating course",
            error,
        });
    }
}
export const deleteCourseController = async (req, res) => {
    try {
        const deletedCourse = await CoursesModel.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).send({
                success: false,
                message: "Course not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Course Deleted Successfully",
            data: deletedCourse,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in deleting course",
            error,
        });
    }
}
// export const getCoursesByTeacherController = async (req, res) => {
//     try {
//         const courses = await CoursesModel.find({ teacherId: req.params.id });
//         if (!courses) {
//             return res.status(404).send({
//                 success: false,
//                 message: "No courses found for this teacher",
//             });
//         }
//         res.status(200).send({
//             success: true,
//             message: "Courses by Teacher",
//             data: courses,
//         });
//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             message: "Error in getting courses by teacher",
//             error,
//         });
//     }
// }
// export const getCoursesByStudentController = async (req, res) => {
//     try {
//         const courses = await CoursesModel.find({ students: req.params.id });
//         if (!courses) {
//             return res.status(404).send({
//                 success: false,
//                 message: "No courses found for this student",
//             });
//         }
//         res.status(200).send({
//             success: true,
//             message: "Courses by Student",
//             data: courses,
//         });
//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             message: "Error in getting courses by student",
//             error,
//         });
//     }
// }
