import AssignmentModel from "./model.js";

export async function findAssignmentsForCourse(courseNumber) {
  console.log("[DAO] findAssignmentsForCourse:", courseNumber);
  const assignments = await AssignmentModel.find({ course: courseNumber });
  console.log("[DAO] findAssignmentsForCourse result:", assignments);
  return assignments;
}

export async function findAssignmentById(assignmentId) {
  console.log("[DAO] findAssignmentById:", assignmentId);
  const assignment = await AssignmentModel.findById(assignmentId);
  console.log("[DAO] findAssignmentById result:", assignment);
  return assignment;
}

export async function createAssignment(assignment) {
  console.log("[DAO] createAssignment:", assignment);
  const newAssignment = await AssignmentModel.create(assignment);
  console.log("[DAO] createAssignment result:", newAssignment);
  return newAssignment;
}

export async function updateAssignment(assignmentId, assignmentUpdates) {
  console.log("[DAO] updateAssignment:", assignmentId, "updates:", assignmentUpdates);
  const updated = await AssignmentModel.findByIdAndUpdate(assignmentId, assignmentUpdates, { new: true });
  console.log("[DAO] updateAssignment result:", updated);
  return updated;
}

export async function deleteAssignment(assignmentId) {
  console.log("[DAO] deleteAssignment:", assignmentId);
  const deleted = await AssignmentModel.findByIdAndDelete(assignmentId);
  console.log("[DAO] deleteAssignment result:", deleted);
  return deleted;
}
