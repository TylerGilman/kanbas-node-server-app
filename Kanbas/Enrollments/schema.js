import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    course: { 
      type: String, // Store the course number
      required: true,
      ref: "CourseModel" 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: "UserModel" 
    }
  },
  { collection: "enrollments" }
);

export default enrollmentSchema;
