import StudentModel from "../models/StudentModel.js";

export const getAllController = async (req, res) => {
    try {
        const students = await StudentModel.find({});
        res.status(200).send({
        success: true,
        message: "All Students List",
        data: students,
        });
    } catch (error) {
        res.status(500).send({
        success: false,
        message: "Error in getting all students",
        error,
        });
    }
    }

export const getOneController = async (req, res) => {
    try {
        const student = await StudentModel.findById(req.params.id);
        if (!student) {
            return res.status(404).send({
                success: false,
                message: "Student not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Single Student Data",
            data: student,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in getting student",
            error,
        });
    }
}

export const createController = async (req, res) => {
    try {
        const newStudent = new StudentModel(req.body);
        await newStudent.save();
        res.status(201).send({
            success: true,
            message: "Student Created Successfully",
            data: newStudent,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in creating student",
            error,
        });
    }
}

export const updateController = async (req, res) => {
    try {
        const updatedStudent = await StudentModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedStudent) {
            return res.status(404).send({
                success: false,
                message: "Student not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Student Updated Successfully",
            data: updatedStudent,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in updating student",
            error,
        });
    }
}

export const deleteController = async (req, res) => {
    try {
        const deletedStudent = await StudentModel.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).send({
                success: false,
                message: "Student not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Student Deleted Successfully",
            data: deletedStudent,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in deleting student",
            error,
        });
    }
}
