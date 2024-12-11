import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    course: { type: String, required: true }, // Store course number directly as a string
    description: { type: String },
    points: { type: Number, required: true },
    dueDate: { type: Date },
    available: { type: Date },
  },
  { collection: "assignments" }
);

export default assignmentSchema;
