import express from "express";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import cors from "cors";

const app = express();

const logsDir = path.join("logs");
if (!fs.existsSync(logsDir)) {
	fs.mkdirSync(logsDir);
}

//Config for log files
const accessLogStream = fs.createWriteStream(path.join("logs", "access.log"), {
	flags: "a",
});

//Rate limiter

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	limit: 10,
	standardHeaders: "draft-8",
	legacyHeaders: true,
	message: "MAX REQUEST LIMIT REACHED",
	statusCode: 429,
});

//Middlewares
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(conf.cookieSecret));
app.use(
	cors({
		origin: "*",
		optionsSuccessStatus: 200,
	})
);
app.use(limiter);

// ROUTES

import userRoute from "./routes/UserRoute.js";
import { conf } from "./conf/conf.js";

app.use("/api/v1/user", userRoute);

export default app;
