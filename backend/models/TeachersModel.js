import mongoose, { Schema } from "mongoose";

const TeacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [20, "Name must be at least 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
      minlength: [3, "Department Name must be at least 3 characters"],
      maxlength: [100, "Department Name cannot exceed 100 characters"],
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
      trim: true,
      minlength: [3, "Specialization Name must be at least 3 characters"],
      maxlength: [100, "Specialization Name cannot exceed 100 characters"],
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("teachers", TeacherSchema);
