//const express = require("express");
import express from "express";
import Hello from "./hello.js";
import Lab5 from "./Lab5/index.js";
const app = express();
// Routers
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
