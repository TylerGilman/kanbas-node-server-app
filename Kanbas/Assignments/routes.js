import * as dao from "./dao.js";
import Database from "../Database/index.js";

function AssignmentRoutes(app) {

  // Get all assignments for a course
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;

    try {
      const assignments = Database.assignments.filter(
        (assignment) => assignment.course === courseId
      );
      res.json(assignments);
    } catch (error) {
      console.error("[SERVER] Error getting assignments:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Create a new assignment
  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const newAssignment = {
      ...req.body,
      _id: Date.now().toString(), // Generate a unique ID
      course: courseId,
    };

    try {
      Database.assignments.push(newAssignment);
      res.status(201).json(newAssignment);
    } catch (error) {
      console.error("[SERVER] Error creating assignment:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Update an assignment by ID
  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const updatedData = req.body;

    try {
      const assignmentIndex = Database.assignments.findIndex(
        (assignment) => assignment._id === assignmentId
      );

      if (assignmentIndex === -1) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      Database.assignments[assignmentIndex] = {
        ...Database.assignments[assignmentIndex],
        ...updatedData,
      };

      res.json(Database.assignments[assignmentIndex]);
    } catch (error) {
      console.error("[SERVER] Error updating assignment:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Delete an assignment by ID
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;

    try {
      const assignmentIndex = Database.assignments.findIndex(
        (assignment) => assignment._id === assignmentId
      );

      if (assignmentIndex === -1) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      const deletedAssignment = Database.assignments.splice(assignmentIndex, 1);
      res.json(deletedAssignment);
    } catch (error) {
      console.error("[SERVER] Error deleting assignment:", error);
      res.status(500).json({ error: error.message });
    }
  });


  // Get a single assignment by ID
  app.get("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;

  try {
    const assignment = Database.assignments.find(
      (assignment) => assignment._id === assignmentId
    );

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    console.error("[SERVER] Error fetching assignment:", error);
    res.status(500).json({ error: error.message });
  }
});
}

export default AssignmentRoutes;
