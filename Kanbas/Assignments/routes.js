import express from "express";
import * as dao from "./dao.js";

const AssignmentRoutes = (app) => {
  // GET all assignments for a course
  app.get("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;
    console.log("[GET /api/courses/:cid/assignments] Fetching assignments for course:", cid);
    try {
      const assignments = await dao.findAssignmentsForCourse(cid);
      console.log("[GET /api/courses/:cid/assignments] Found assignments:", assignments);
      res.json(assignments);
    } catch (error) {
      console.error("[GET /api/courses/:cid/assignments] Error:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  // GET an assignment by ID
  app.get("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    console.log("[GET /api/assignments/:assignmentId] Fetching assignment:", assignmentId);
    try {
      const assignment = await dao.findAssignmentById(assignmentId);
      console.log("[GET /api/assignments/:assignmentId] Found assignment:", assignment);
      res.json(assignment);
    } catch (error) {
      console.error("[GET /api/assignments/:assignmentId] Error:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  // CREATE a new assignment for a course
  app.post("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;
    const assignment = { ...req.body, course: cid };
    console.log("[POST /api/courses/:cid/assignments] Creating assignment for course:", cid, "Data:", assignment);
    try {
      const newAssignment = await dao.createAssignment(assignment);
      console.log("[POST /api/courses/:cid/assignments] Created assignment:", newAssignment);
      res.status(201).json(newAssignment);
    } catch (error) {
      console.error("[POST /api/courses/:cid/assignments] Error:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  // UPDATE an assignment
  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    console.log("[PUT /api/assignments/:assignmentId] Updating assignment:", assignmentId, "with data:", req.body);
    try {
      const updatedAssignment = await dao.updateAssignment(assignmentId, req.body);
      console.log("[PUT /api/assignments/:assignmentId] Updated assignment:", updatedAssignment);
      res.json(updatedAssignment);
    } catch (error) {
      console.error("[PUT /api/assignments/:assignmentId] Error:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  // DELETE an assignment
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    console.log("[DELETE /api/assignments/:assignmentId] Deleting assignment:", assignmentId);
    try {
      await dao.deleteAssignment(assignmentId);
      console.log("[DELETE /api/assignments/:assignmentId] Assignment deleted");
      res.sendStatus(204);
    } catch (error) {
      console.error("[DELETE /api/assignments/:assignmentId] Error:", error.message);
      res.status(500).json({ error: error.message });
    }
  });
};

export default AssignmentRoutes;
