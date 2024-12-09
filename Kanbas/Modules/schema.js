import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    course: { type: String, ref: "CourseModel", required: true },
  },
  { collection: "modules" } // This sets the MongoDB collection name
);

export default mongoose.model("ModuleModel", moduleSchema);
