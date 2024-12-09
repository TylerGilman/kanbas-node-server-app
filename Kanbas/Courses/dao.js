import Database from "../Database/index.js";
import model from "./model.js"

export async function findAllCourses() {
  // Only return courses that have both name and description
  return model.find({
    name: { $exists: true, $ne: "" },
    description: { $exists: true, $ne: "" }
  });
}

export async function findCoursesForUser(userId) {
 const enrollments = await model.find({ user: userId }).populate("course");
 return enrollments.map((enrollment) => enrollment.course);
}

export function createCourse(course) {
  if (course._id) {
    delete course._id; // Ensure _id is removed if present
  }
  return model.create(course);
}

export function deleteCourse(courseId) {
  if (!courseId) {
    throw new Error("Course ID is required");
  }
  return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
 return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
