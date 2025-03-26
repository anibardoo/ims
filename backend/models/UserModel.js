import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "username must be at least 3 characters"],
      maxlength: [20, "Username must be at least 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],

      // match: [
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      //   "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
      // ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    instituteName: {
      type: String,
      required: [true, "Institute Name is required"],
      trim: true,
      minlength: [3, "Institute Name must be at least 3 characters"],
      maxlength: [100, "Institute Name cannot exceed 100 characters"],
    },

    // image: {
    //   type: String,
    //   // required: [true, 'Profile image is required'],
    //   // match: [
    //   //     /\.(jpg|jpeg)$/i,
    //   //     'Only JPG, JPEG, image formats are allowed'
    //   // ]
    // },
  },
  { timestamps: true }
);
export default mongoose.model("tests", UserSchema);
