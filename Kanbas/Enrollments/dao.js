import Database from "../Database/index.js";

/**
 * Fetch all enrollments for a course.
 * @param {string} courseId
 * @returns {Array} List of enrollments for the course.
 */
export function getEnrollmentsForCourse(courseId) {
  return Database.enrollments.filter((enrollment) => enrollment.course === courseId);
}

/**
 * Enroll a user in a course.
 * @param {string} userId
 * @param {string} courseId
 * @returns {Object} The new enrollment.
 */
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  console.log("test");
  // Check if user is already enrolled
  const isEnrolled = enrollments.some(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  if (isEnrolled) {
    throw new Error("User is already enrolled in this course.");
  }

  const newEnrollment = { _id: Date.now(), user: userId, course: courseId };
  enrollments.push(newEnrollment);
  return newEnrollment;
}

/**
 * Unenroll a user from a course.
 * @param {string} userId
 * @param {string} courseId
 * @returns {Object} The removed enrollment.
 */
export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;

  const enrollmentIndex = enrollments.findIndex(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );

  if (enrollmentIndex === -1) {
    throw new Error("Enrollment not found.");
  }

  const [removedEnrollment] = enrollments.splice(enrollmentIndex, 1);
  return removedEnrollment;
}
