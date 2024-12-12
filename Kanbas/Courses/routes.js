import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import * as usersDao from "../Users/dao.js";

export default function CourseRoutes(app) {


  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

app.post("/api/courses/:cid/enrollments", async (req, res) => {
  const { cid } = req.params; // cid is the course number
  const { userId } = req.body;
  await enrollmentsDao.enrollUserInCourse(userId, cid);
  res.sendStatus(200);
});

app.delete("/api/courses/:cid/enrollments/:uid", async (req, res) => {
  const { cid, uid } = req.params; // cid is course number, uid is user ID
  await enrollmentsDao.unenrollUserFromCourse(uid, cid);
  res.sendStatus(200);
});


app.put("/api/courses/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    
    console.log("[PUT /api/courses/:courseId] Updating course:", courseId, "with:", courseUpdates);
    
    const status = await dao.updateCourse(courseId, courseUpdates);
    
    if (status.matchedCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    if (status.modifiedCount === 0) {
      return res.status(400).json({ message: "No changes made to the course" });
    }
    
    res.json({ message: "Course updated successfully", status });
  } catch (error) {
    console.error("[PUT /api/courses/:courseId] Error:", error);
    res.status(500).json({ 
      message: "Error updating course", 
      error: error.message 
    });
  }
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

 app.post("/api/courses", async (req, res) => {
   const course = await dao.createCourse(req.body);
   const currentUser = req.session["currentUser"];
   if (currentUser) {
     await enrollmentsDao.enrollUserInCourse(currentUser._id, course.number);
   }
   res.json(course);
 });

app.get('/api/courses', async (req, res) => {
  try {
    const courses = await dao.findAllCourses();
    res.json(courses);
  } catch (error) {
    console.error("Error in /api/courses route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

}
