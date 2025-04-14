import mongoose ,{Schema} from "mongoose";

const StudentScema = new Schema(
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
    roll: {
      type: String,
      required: [true, "Roll number is required"],
      unique: true,
     
    },
    batch: {
      type: String,
      required: [true, "Batch is required"],
      trim: true,
     
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
      minlength: [3, "Department Name must be at least 3 characters"],
      maxlength: [100, "Department Name cannot exceed 100 characters"],
    },
    course:[{

      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      
    }]
  },
  { timestamps: true }

  
);

export default mongoose.model("students", StudentScema);