// Kanbas/Courses/dao.js
import model from "./model.js";

export function createCourse(course) {
  console.log("[DAO createCourse] Creating course with data:", course);
  if (!course.number) {
    // Generate a unique course number if none provided
    course.number = `Course${new Date().getTime()}`;
  }
  delete course._id;
  return model.create(course).then(created => {
    console.log("[DAO createCourse] Created course:", created);
    return created;
  });
}

export function updateCourse(courseNumber, courseUpdates) {
  console.log("[DAO updateCourse] Updating course number:", courseNumber, "with:", courseUpdates);
  const updates = { ...courseUpdates };
  delete updates._id;
  delete updates.enrolled;
  
  // Use findOneAndUpdate to get the updated document back
  return model.findOneAndUpdate(
    { number: courseNumber },
    { $set: updates },
    { new: true } // Return the updated document
  ).then(updated => {
    console.log("[DAO updateCourse] Updated course:", updated);
    return updated;
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

export function deleteCourse(courseNumber) {
  console.log("[DAO deleteCourse] Deleting course with number:", courseNumber);
  return model.deleteOne({ number: courseNumber })
    .then(result => {
      console.log("[DAO deleteCourse] Delete result:", result);
      return result;
    });
}
