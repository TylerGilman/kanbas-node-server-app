// Kanbas/Enrollments/dao.js
import model from "./model.js";
import courseModel from "../Courses/model.js";

export async function findUsersForCourse(courseId) {
    try {
        const enrollments = await model.find({ course: courseId })
            .populate({
                path: "user",
                select: "-password"
            });
        return enrollments.map(enrollment => enrollment.user);
    } catch (error) {
        console.error("Error finding users for course:", error);
        throw error;
    }
}

export async function findCoursesForUser(userId) {
    try {
        const enrollments = await model.find({ user: userId });
        const courseNumbers = enrollments.map(e => e.course);
        const courses = await courseModel.find({ number: { $in: courseNumbers }});
        return courses;
    } catch (error) {
        console.error("Error finding courses for user:", error);
        throw error;
    }
}

export async function enrollUserInCourse(userId, courseId) {
    return model.create({ user: userId, course: courseId });
}

export async function unenrollUserFromCourse(userId, courseId) {
    return model.deleteOne({ user: userId, course: courseId });
}
