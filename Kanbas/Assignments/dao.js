import Database from "../Database/index.js";

export const findAllAssignments = () => {
  return Database.assignments;
};

export const findAssignmentsForCourse = (courseId) => {
  const assignments = Database.assignments.filter(
    (assignment) => assignment.course === courseId
  );
  return assignments;
};

export const createAssignment = (assignment) => {
  Database.assignments.push(assignment);
  return assignment;
};

export const findAssignmentById = (aid) => {
  return Database.assignments.find((a) => a._id === aid);
};

export const updateAssignment = (aid, assignment) => {
  Database.assignments = Database.assignments.map((a) =>
    a._id === aid ? { ...assignment } : a
  );
  return assignment;
};

export const deleteAssignment = (aid) => {
  Database.assignments = Database.assignments.filter(
    (a) => a._id !== aid
  );
  return { status: "OK" };
};
