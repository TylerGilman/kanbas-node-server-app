import model from "./model.js";
import mongoose from "mongoose";
import courseModel from "../Courses/model.js";

export async function findCoursesForUser(userId) {
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const enrollments = await model.find({ user: userObjectId });
    
    // Get all course numbers from enrollments
    const courseNumbers = enrollments.map(e => e.course).filter(Boolean);
    
    // Fetch actual course data
    const courses = await courseModel.find({ number: { $in: courseNumbers } });
    
    return courses.map(course => ({
      _id: course._id,
      number: course.number,
      name: course.name,
      description: course.description
    }));
  } catch (error) {
    console.error("Error in findCoursesForUser:", error);
    return [];
  }
}

export async function findUsersForCourse(courseNumber) {
    try {
        const enrollments = await model.find({ course: courseNumber }) // Use courseNumber directly
            .populate({
                path: "user",
                select: "-password" // Optionally exclude sensitive fields
            })
            .lean();
        return enrollments.map((enrollment) => enrollment.user);
    } catch (error) {
        console.error("Error finding users for course:", error);
        throw error;
    }
}


export async function enrollUserInCourse(userId, courseNumber) {
  try {
    if (!userId || !courseNumber) {
      throw new Error("User ID and course number are required");
    }
    return await model.create({ 
      user: userId, 
      course: courseNumber 
    });
  } catch (error) {
    console.error("Error in enrollUserInCourse:", error);
    throw error;
  }
}

export async function unenrollUserFromCourse(userId, courseNumber) {
  try {
    return await model.deleteOne({ 
      user: userId, 
      course: courseNumber 
    });
  } catch (error) {
    console.error("Error in unenrollUserFromCourse:", error);
    throw error;
  }
}
