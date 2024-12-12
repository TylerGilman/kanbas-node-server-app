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

export const createModule = async (module) => {
  console.log("[DAO] createModule:", module);

  try {
    // Ensure `_id` is not explicitly set
    const { _id, ...moduleData } = module;

    const newModule = await model.create(moduleData);
    console.log("[DAO] createModule result:", newModule);
    return newModule;
  } catch (error) {
    console.error("[DAO] Error creating module:", error.message);
    throw error;
  }
};

export const findModuleById = async (moduleId) => {
  try {
    console.log("[DAO] findModuleById:", moduleId);
    const isValid = mongoose.Types.ObjectId.isValid(moduleId);
    if (!isValid) {
      console.error("[DAO] Invalid ObjectId:", moduleId);
      return null;
    }
    const module = await model.findById(new mongoose.Types.ObjectId(moduleId));
    console.log("[DAO] findModuleById result:", module);
    return module;
  } catch (error) {
    console.error("[DAO] Error in findModuleById:", error.message);
    throw error;
  }
};

export const updateModule = async (moduleId, moduleUpdates) => {
  console.log("[DAO] updateModule:", moduleId, "updates:", moduleUpdates);

  // Remove `_id` from the update payload
  const { _id, ...updates } = moduleUpdates;

  const updated = await model.findByIdAndUpdate(
    new mongoose.Types.ObjectId(moduleId), // Ensure `moduleId` is a valid ObjectId
    updates,
    { new: true, runValidators: true } // Return updated document and validate updates
  );

  console.log("[DAO] updateModule result:", updated);
  return updated;
};

export async function deleteModule(moduleId) {
  console.log("[DAO deleteModule] Deleting module:", moduleId);
  if (!mongoose.Types.ObjectId.isValid(moduleId)) {
    console.error("[DAO] Invalid ObjectId for delete:", moduleId);
    return null;
  }
  const result = await model.findByIdAndDelete(new mongoose.Types.ObjectId(moduleId));
  console.log("[DAO] deleteModule result:", result);
  return result;
}
