import model from "./model.js"

export async function findAllCourses() {
  try {
    return await model.find({
      _id: { $exists: true, $ne: "" },
      name: { $exists: true, $ne: "" },
      description: { $exists: true, $ne: "" },
    });
  } catch (error) {
    console.error("Error fetching courses from database:", error);
    throw new Error("Database query failed");
  }
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
