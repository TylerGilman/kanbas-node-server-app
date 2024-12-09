import mongoose from "mongoose";
import schema from "./schema.js";

const AssignmentModel = mongoose.model("AssignmentModel", schema);

export default AssignmentModel;
