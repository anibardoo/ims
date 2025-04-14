import TeachersModel from '../models/TeachersModel.js';

export const getAllTeacherController = async (req, res) => {
    try {
        const teachers = await TeachersModel.find({});
        res.status(200).send({
            success: true,
            message: "All Teachers List",
            data: teachers,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in getting all teachers",
            error,
        });
    }
}
export const getOneTeacherController = async (req, res) => {
    try {
        const teacher = await TeachersModel.findById(req.params.id);
        if (!teacher) {
            return res.status(404).send({
                success: false,
                message: "Teacher not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Single Teacher Data",
            data: teacher,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in getting teacher",
            error,
        });
    }
}
export const createTeacherController = async (req, res) => {
    try {
        const newTeacher = new TeachersModel(req.body);
        await newTeacher.save();
        res.status(201).send({
            success: true,
            message: "Teacher Created Successfully",
            data: newTeacher,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in creating teacher",
            error,
        });
    }
}

export const updateTeacherController = async (req, res) => {
    try {
            const updatedTeacher = await TeachersModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedTeacher) {
                return res.status(404).send({
                    success: false,
                    message: "Teacher not found",
                });
            }
            res.status(200).send({
                success: true,
                message: "Teacher Updated Successfully",
                data: updatedTeacher,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error in updating teacher",
                error,
            });
        }
    }
export const deleteTeacherController = async (req, res) => {
    try {
        const deletedTeacher = await TeachersModel.findByIdAndDelete(req.params.id);
        if (!deletedTeacher) {
            return res.status(404).send({
                success: false,
                message: "Teacher not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Teacher Deleted Successfully",
            data: deletedTeacher,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in deleting teacher",
            error,
        });
    }
}