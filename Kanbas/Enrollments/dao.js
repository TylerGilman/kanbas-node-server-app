import model from "./model.js";
import { mongoose } from 'mongoose';

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

const findCoursesForUser = async (userId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error(`Invalid ObjectId: ${userId}`);
    }

    return await Enrollment.find({ user: mongoose.Types.ObjectId(userId) })
      .populate('course')
      .exec();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function enrollUserInCourse(user, course) {
 return model.create({ user, course });
}
export function unenrollUserFromCourse(user, course) {
 return model.deleteOne({ user, course });
}
