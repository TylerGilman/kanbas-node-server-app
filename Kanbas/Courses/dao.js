import Database from "../Database/index.js";
import model from "./model.js"
export function findAllCourses() {
  return model.find();
}

export async function findCoursesForUser(userId) {
 const enrollments = await model.find({ user: userId }).populate("course");
 return enrollments.map((enrollment) => enrollment.course);
}

export function createCourse(course) {
 delete course._id;
 return model.create(course);
}

export function deleteCourse(courseId) {
 return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
 return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
