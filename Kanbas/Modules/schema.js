import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.Mixed, // This allows both ObjectId and String
      auto: false // Don't auto-generate
    },
    name: { type: String, required: true },
    course: { type: String, required: true },
    description: String,
  },
  { 
    collection: "modules",
    _id: false // Disable auto _id generation
  }
);

export default moduleSchema;
