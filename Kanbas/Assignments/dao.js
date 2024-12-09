import AssignmentModel from "./model.js";

export const findAllAssignments = async () => {
  return AssignmentModel.find().populate("course");
};

export const findAssignmentsForCourse = async (courseId) => {
  return AssignmentModel.find({ course: courseId }).populate("course");
};

export const findAssignmentById = async (id) => {
  return AssignmentModel.findById(id).populate("course");
};

export const createAssignment = async (assignment) => {
  return AssignmentModel.create(assignment);
};

export const updateAssignment = async (id, updatedData) => {
  return AssignmentModel.findByIdAndUpdate(id, updatedData, { new: true });
};

export const deleteAssignment = async (id) => {
  return AssignmentModel.findByIdAndDelete(id);
};
