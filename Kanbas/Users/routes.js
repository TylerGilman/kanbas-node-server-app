import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    try {
      const user = await dao.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user" });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const status = await dao.deleteUser(req.params.userId);
      res.json(status);
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user" });
    }
  };

  const findUserById = async (req, res) => {
    try {
      const user = await dao.findUserById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error finding user by ID:", error);
      res.status(500).json({ message: "Error finding user" });
    }
  };

  const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const userUpdates = req.body;
      await dao.updateUser(userId, userUpdates);
      const currentUser = req.session["currentUser"];
      if (currentUser && currentUser._id === userId) {
        req.session["currentUser"] = { ...currentUser, ...userUpdates };
      }
      res.json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user" });
    }
  };

  const signup = async (req, res) => {
    try {
      const existingUser = await dao.findUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const newUser = {
        ...req.body,
        role: req.body.role || "USER",
      };
      const currentUser = await dao.createUser(newUser);
      req.session["currentUser"] = currentUser;
      res.status(201).json(currentUser);
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Error during signup" });
    }
  };


  const signout = (req, res) => {
    try {
      req.session.destroy(() => {
        res.sendStatus(200);
      });
    } catch (error) {
      console.error("Error during signout:", error);
      res.status(500).json({ message: "Error during signout" });
    }
  };

const profile = async (req, res) => {
  try {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.status(401).json({ message: "Not logged in" });
    }
    res.json(currentUser);
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: error.message });
  }
};

app.get("/api/users/profile", profile);  // Changed to GET
app.post("/api/users/signin", signin);


const findCoursesForUser = async (req, res) => {
  try {
    let { uid } = req.params;
    if (!uid) {
      return res.status(400).json({ message: "User ID is required" });
    }

    console.log("Finding courses for user:", uid); // Debug log

    const courses = await enrollmentsDao.findCoursesForUser(uid);
    
    return res.json(courses);
  } catch (error) {
    console.error("Server error in findCoursesForUser:", error);
    return res.status(500).json({ 
      message: "Error finding courses", 
      error: error.message 
    });
  }
};

const enrollUserInCourse = async (req, res) => {
  try {
    let { uid, cid } = req.params; // cid should be course number
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Not logged in" });
      }
      uid = currentUser._id;
    }

    console.log("Enrolling user", uid, "in course", cid);

    const enrollment = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.json(enrollment);
  } catch (error) {
    console.error("Error enrolling user:", error);
    res.status(500).json({ 
      message: "Failed to enroll user", 
      error: error.message 
    });
  }
};

const unenrollUserFromCourse = async (req, res) => {
  try {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ message: "Not logged in" });
      }
      uid = currentUser._id;
    }

    const result = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.json(result);
  } catch (error) {
    console.error("Error unenrolling user:", error);
    res.status(500).json({ 
      message: "Failed to unenroll user", 
      error: error.message 
    });
  }
};

  const findAllUsers = async (req, res) => {
    try {
      const { role, name } = req.query;
      if (role) {
        const users = await dao.findUsersByRole(role);
        return res.json(users);
      }
      if (name) {
        const users = await dao.findUsersByPartialName(name);
        return res.json(users);
      }
      const users = await dao.findAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error finding users:", error);
      res.status(500).json({ message: "Error finding users" });
    }
  };

  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.status(401).json({ message: "Not logged in" });
    }

    try {
      const newCourse = await courseDao.createCourse(req.body);
      await enrollmentsDao.enrollUserInCourse(currentUser, newCourse.number);
      res.status(201).json(newCourse);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Error creating course" });
    }
  };

  const findUsersForCourse = async (req, res) => {
      try {
          const { cid } = req.params;
          const users = await enrollmentsDao.findUsersForCourse(cid);
          res.json(users);
      } catch (error) {
          console.error("Error fetching users for course:", error);
          res.status(500).json({ error: "Failed to retrieve users for course" });
      }
  };

  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
  app.get("/api/courses/:cid/users", findUsersForCourse);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:uid/enrollments", findCoursesForUser);
  app.get("/api/courses/:cid/users", findUsersForCourse);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.post("/api/users/current/courses", createCourse);
  app.post("/api/users", createUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.get("/api/users/profile", profile);
  app.delete("/api/users/:userId", deleteUser);
}
