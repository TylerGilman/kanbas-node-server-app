import express from "express";
import * as dao from "./dao.js";

const AssignmentRoutes = (app) => {
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    try {
      const assignments = await dao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    try {
      const assignment = await dao.findAssignmentById(assignmentId);
      res.json(assignment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignment = { ...req.body, course: courseId };
    try {
      const newAssignment = await dao.createAssignment(assignment);
      res.status(201).json(newAssignment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    try {
      const updatedAssignment = await dao.updateAssignment(assignmentId, req.body);
      res.json(updatedAssignment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    try {
      await dao.deleteAssignment(assignmentId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

export default AssignmentRoutes;
