import express from "express";
import mongoose from "mongoose";
import Hello from "./hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import "dotenv/config";
import session from "express-session";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";

mongoose.connect(CONNECTION_STRING)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    const admin = mongoose.connection.db.admin();
    const dbs = await admin.listDatabases();
    console.log('Available databases:', dbs.databases.map(db => db.name));
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in kanbas:', collections.map(c => c.name));
    
    // Try to fetch documents from each collection
    for (const collection of collections) {
      const count = await mongoose.connection.db.collection(collection.name).countDocuments();
      const sample = await mongoose.connection.db.collection(collection.name).findOne({});
      console.log(`Collection ${collection.name}:`);
      console.log('- Document count:', count);
      console.log('- Sample document:', sample);
    }
  })
  .catch(err => {
    console.error('Connection error:', err);
  });

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);

app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`[SERVER] Server running on port ${PORT}`);
});
