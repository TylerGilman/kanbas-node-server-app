import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  // Delete module
  app.delete("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      const status = await modulesDao.deleteModule(moduleId);
      res.json(status);
    } catch (error) {
      console.error("Error deleting module:", error);
      res.status(500).json({ message: error.message });
    }
  });

app.put("/api/modules/:moduleId", async (req, res) => {
  try {
    const { moduleId } = req.params;
    console.log("[Routes] Update request for module:", moduleId);
    console.log("[Routes] Update data:", req.body);

    // Exclude `_id` from the request body
    const { _id, ...updateData } = req.body;

    const existingModule = await modulesDao.findModuleById(moduleId);
    if (!existingModule) {
      console.log("[Routes] Module not found:", moduleId);
      return res.status(404).json({ message: `Module not found: ${moduleId}` });
    }

    const updatedModule = await modulesDao.updateModule(moduleId, updateData);
    console.log("[Routes] Update successful:", updatedModule);
    res.json(updatedModule);
  } catch (error) {
    console.error("[Routes] Update failed:", error);
    res.status(500).json({ message: error.message });
  }
});

  // Find modules for course
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const modules = await modulesDao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      console.error("Error finding modules:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Create module for course
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const module = {
        ...req.body,
        course: courseId,
      };
      const newModule = await modulesDao.createModule(module);
      res.status(201).json(newModule);
    } catch (error) {
      console.error("Error creating module:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Find module by ID (optional)
  app.get("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      const module = await modulesDao.findModuleById(moduleId);
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      res.json(module);
    } catch (error) {
      console.error("Error finding module:", error);
      res.status(500).json({ message: error.message });
    }
  });
}
