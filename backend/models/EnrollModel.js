 import mongoose from "mongoose";

    const enrollSchema = new mongoose.Schema({
        student:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "students",
            required: true
        },
        teacher:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "teachers",
            required: true
        },
        course:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "courses",
            required: true
        },
        enrolledAt:{
            type: Date,
            default: Date.now
        },
        status:{
            type: String,
            enum: ["active", "completed", "dropped"],
            default: "active"
        }

    })

    export default mongoose.model("Enroll", enrollSchema)