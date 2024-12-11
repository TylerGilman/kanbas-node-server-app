import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    name: String,
    number: String,
    credits: Number,
    description: String,
  },
  { collection: "courses" }  // Explicitly specify lowercase collection name
);
export default courseSchema;
