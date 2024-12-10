import model from "./model.js";

export function createCourse(course) {
  // Generate a string ID if not provided
  if (!course._id) {
    course._id = new Date().getTime().toString();
  }
  return model.create(course);
}

export async function findAllCourses() {
  try {
    return await model.find({
      number: { $exists: true },
      name: { $exists: true }
    });
  } catch (error) {
    console.error("Error fetching courses from database:", error);
    throw new Error("Database query failed");
  }
}

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
