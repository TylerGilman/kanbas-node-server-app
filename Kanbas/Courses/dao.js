import model from "./model.js"

export async function findAllCourses() {
  // Only return courses that have both name and description
  return await model.find({
    name: { $exists: true, $ne: "" },
    description: { $exists: true, $ne: "" }
  });
}

export async function findCoursesForUser(userId) {
 const enrollments = await model.find({ user: userId }).populate("course");
 return enrollments.map((enrollment) => enrollment.course);
}

export function createCourse(course) {
  if (course.number) {
    delete course.number; // Ensure _id is removed if present
  }
  return model.create(course);
}

export function deleteCourse(courseId) {
  if (!courseId) {
    throw new Error("Course ID is required");
  }
  return model.deleteOne({ number: courseId });
}

export function updateCourse(courseId, courseUpdates) {
 return model.updateOne({ number: courseId }, { $set: courseUpdates });
}
