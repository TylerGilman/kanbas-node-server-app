import * as dao from "./dao.js";
import Database from "../Database/index.js";

function AssignmentRoutes(app) {
  console.log("[SERVER] Setting up Assignment routes");
  console.log("[SERVER] Initial assignments in database:", Database.assignments);

  // Get all assignments for a course
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    console.log("[SERVER] Getting assignments for course:", courseId);

    try {
      const assignments = Database.assignments.filter(
        (assignment) => assignment.course === courseId
      );
      console.log("[SERVER] Filtered assignments:", assignments);
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
    console.log("[SERVER] Creating new assignment:", newAssignment);

    try {
      Database.assignments.push(newAssignment);
      console.log("[SERVER] Updated assignments:", Database.assignments);
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
    console.log("[SERVER] Updating assignment:", assignmentId);

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

      console.log("[SERVER] Updated assignment:", Database.assignments[assignmentIndex]);
      res.json(Database.assignments[assignmentIndex]);
    } catch (error) {
      console.error("[SERVER] Error updating assignment:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Delete an assignment by ID
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    console.log("[SERVER] Deleting assignment:", assignmentId);

    try {
      const assignmentIndex = Database.assignments.findIndex(
        (assignment) => assignment._id === assignmentId
      );

      if (assignmentIndex === -1) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      const deletedAssignment = Database.assignments.splice(assignmentIndex, 1);
      console.log("[SERVER] Deleted assignment:", deletedAssignment);
      res.json(deletedAssignment);
    } catch (error) {
      console.error("[SERVER] Error deleting assignment:", error);
      res.status(500).json({ error: error.message });
    }
  });


  // Get a single assignment by ID
  app.get("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    console.log("[SERVER] Fetching assignment by ID:", assignmentId);

  try {
    const assignment = Database.assignments.find(
      (assignment) => assignment._id === assignmentId
    );

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    console.log("[SERVER] Found assignment:", assignment);
    res.json(assignment);
  } catch (error) {
    console.error("[SERVER] Error fetching assignment:", error);
    res.status(500).json({ error: error.message });
  }
});

  // Test route to verify all assignments
  app.get("/api/assignments/test", async (req, res) => {
    console.log("[SERVER] All assignments:", Database.assignments);
    res.json({
      message: "Assignments data",
      assignments: Database.assignments,
    });
  });
}

export default AssignmentRoutes;
