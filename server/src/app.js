import express from "express";
import fs from "fs";
import path from "path";
import morgan from "morgan";
const app = express();

const logsDir = path.join("logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

//Config for log files 
const accessLogStream = fs.createWriteStream(
    path.join("logs", "access.log"),
    { flags: "a" }
  );
  

//Middlewares
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES

import userRoute from "./routes/UserRoute.js";

app.use("/api/v1/user", userRoute);

export default app;
