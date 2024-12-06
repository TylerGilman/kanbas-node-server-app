import mongoose from "mongoose";
import userSchema from "./schema.js";
const model = mongoose.model("User", userSchema);
export default model;
