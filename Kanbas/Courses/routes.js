import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import * as usersDao from "../Users/dao.js";

export default function CourseRoutes(app) {
 const findUsersForCourse = async (req, res) => {
   const { cid } = req.params;
   const users = await userDao.findUsersForCourse(cid);
   res.json(users);
 };
 app.get("/api/courses/:cid/users", findUsersForCourse);

  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.put("/api/courses/:courseId", async (req, res) => {
  const { courseId } = req.params;
  const courseUpdates = req.body;
  
  // Validate required fields
  if (!courseUpdates.name?.trim() || !courseUpdates.description?.trim()) {
    return res.status(400).json({ message: "Name and description are required" });
  }
  
  const status = await dao.updateCourse(courseId, courseUpdates);
  res.json(status);
});

 app.post("/api/courses", async (req, res) => {
   const course = await dao.createCourse(req.body);
   const currentUser = req.session["currentUser"];
   if (currentUser) {
     await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
   }
   res.json(course);
 });

 app.delete("/api/courses/:courseId", async (req, res) => {
   const { courseId } = req.params;
   const status = await dao.deleteCourse(courseId);
   res.send(status);
 });


 app.post("/api/courses/:courseId/modules", async (req, res) => {
   const { courseId } = req.params;
   const module = {
     ...req.body,
     course: courseId,
   };
   const newModule = await modulesDao.createModule(module);
   res.send(newModule);
 });
}
