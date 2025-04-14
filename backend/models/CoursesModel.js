import mongoose,{Schema} from "mongoose";

const CourseSchema = new Schema(
    {
        courseName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Course Name must be at least 3 characters"],
        maxlength: [100, "Course Name cannot exceed 100 characters"],
        },
        courseCode: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        },
        courseDuration: {
        type: String,
        required: true,
        trim: true,
        },
        courseDescription: {
        type: String,
        required: true,
        trim: true,
        },
        teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "teachers",
        },
        student:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
       
        }]
    },
    { timestamps: true }
    );
    export default mongoose.model("courses", CourseSchema);