//const express = require("express");
import express from "express";
import Hello from "./hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
const app = express();
// Routers
app.use(cors());
app.use(express.json());
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
