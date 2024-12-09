import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel", required: true },
    description: { type: String },
    points: { type: Number, required: true },
    dueDate: { type: Date },
    available: { type: Date },
  },
  { collection: "assignments" } // Set the MongoDB collection name
);

export default assignmentSchema; // Export only the schema
