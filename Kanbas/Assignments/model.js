import mongoose from "mongoose";
import assignmentSchema from "./schema.js"; // Import the schema

const AssignmentModel = mongoose.model("AssignmentModel", assignmentSchema); // Use schema as 2nd parameter

export default AssignmentModel; // Export the model
