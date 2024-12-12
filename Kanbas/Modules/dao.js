import model from "./model.js";
import mongoose from "mongoose";

const isValidObjectId = (id) => {
  try {
    new mongoose.Types.ObjectId(id);
    return true;
  } catch (error) {
    return false;
  }
};

export function findModulesForCourse(courseId) {
  console.log("[DAO findModulesForCourse] Finding modules for course:", courseId);
  return model.find({ course: courseId });
}

export function createModule(module) {
  // For new modules, use timestamp string ID
  module._id = module._id || new Date().getTime().toString();
  console.log("[DAO createModule] Creating module:", module);
  return model.create(module);
}

export async function updateModule(moduleId, moduleUpdates) {
  console.log("[DAO updateModule] Updating module:", moduleId);
  console.log("[DAO updateModule] Updates:", moduleUpdates);

  const updates = { ...moduleUpdates };
  delete updates._id;
  delete updates.editing;

  // Create query that can match either ObjectId or string ID
  let query = { _id: moduleId };
  if (isValidObjectId(moduleId)) {
    query = {
      $or: [
        { _id: moduleId },
        { _id: new mongoose.Types.ObjectId(moduleId) }
      ]
    };
  }

  try {
    const result = await model.findOneAndUpdate(
      query,
      { $set: updates },
      { new: true }
    );
    console.log("[DAO updateModule] Result:", result);
    return result;
  } catch (error) {
    console.error("[DAO updateModule] Error:", error);
    throw error;
  }
}

export async function deleteModule(moduleId) {
  console.log("[DAO deleteModule] Deleting module:", moduleId);
  let query = { _id: moduleId };
  if (isValidObjectId(moduleId)) {
    query = {
      $or: [
        { _id: moduleId },
        { _id: new mongoose.Types.ObjectId(moduleId) }
      ]
    };
  }
  return model.findOneAndDelete(query);
}
