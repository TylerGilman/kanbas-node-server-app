// Kanbas/Courses/dao.js
import model from "./model.js";

export function createCourse(course) {
  console.log("[DAO createCourse] Creating course with number:", course.number);
  if (course._id) {
    delete course._id;
  }
  return model.create(course).then(created => {
    console.log("[DAO createCourse] Created course:", created);
    return created;
  });
}

export async function findAllCourses() {
  console.log("[DAO findAllCourses] Fetching all courses...");
  const courses = await model.find({
    number: { $exists: true },
    name: { $exists: true }
  });
  console.log("[DAO findAllCourses] Found courses:", courses.length);
  return courses;
}

export function updateCourse(courseNumber, courseUpdates) {
  console.log("[DAO updateCourse] Updating course number:", courseNumber, "with:", courseUpdates);
  return model.updateOne({ number: courseNumber }, { $set: courseUpdates })
    .then(result => {
      console.log("[DAO updateCourse] Update result:", result);
      return result;
    });
}

export function deleteCourse(courseNumber) {
  console.log("[DAO deleteCourse] Deleting course with number:", courseNumber);
  return model.deleteOne({ number: courseNumber })
    .then(result => {
      console.log("[DAO deleteCourse] Delete result:", result);
      return result;
    });
}
