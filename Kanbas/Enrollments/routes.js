import express from "express";
import {
  getEnrollmentsForCourse,
  enrollUserInCourse,
  unenrollUserFromCourse,
} from "./dao.js";

function EnrollmentRoutes(app) {
  console.log("[SERVER] Setting up Enrollment routes");

  // Get all enrollments for a course
  app.get("/api/courses/:courseId/enrollments", (req, res) => {
    const { courseId } = req.params;
    console.log("[SERVER] Fetching enrollments for course:", courseId);

    try {
      const enrollments = getEnrollmentsForCourse(courseId);
      res.json(enrollments);
    } catch (error) {
      console.error("[SERVER] Error fetching enrollments:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Enroll a user in a course
  app.post("/api/courses/:courseId/enrollments", (req, res) => {
    const { courseId } = req.params;
    const { userId } = req.body;
    console.log("[SERVER] Enrolling user:", userId, "in course:", courseId);

    try {
      const newEnrollment = enrollUserInCourse(userId, courseId);
      res.status(201).json(newEnrollment);
    } catch (error) {
      console.error("[SERVER] Error enrolling user:", error);
      res.status(400).json({ error: error.message });
    }
  });

  // Unenroll a user from a course
  app.delete("/api/courses/:courseId/enrollments/:userId", (req, res) => {
    const { courseId, userId } = req.params;
    console.log("[SERVER] Unenrolling user:", userId, "from course:", courseId);

    try {
      const removedEnrollment = unenrollUserFromCourse(userId, courseId);
      res.json(removedEnrollment);
    } catch (error) {
      console.error("[SERVER] Error unenrolling user:", error);
      res.status(404).json({ error: error.message });
    }
  });

  // Test route to view all enrollments
  app.get("/api/enrollments/test", (req, res) => {
    console.log("[SERVER] Current enrollments:", Database.enrollments);
    res.json({ enrollments: Database.enrollments });
  });
}

export default EnrollmentRoutes;
