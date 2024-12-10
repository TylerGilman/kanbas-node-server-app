import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    number: { type: String, required: true },
    credits: Number,
    description: String,
  },
  { collection: "courses" }
);
export default courseSchema;
