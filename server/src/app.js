import express from "express";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize"
import cors from "cors";
import helmet from "helmet"
import hpp from "hpp"
import cors from "cors"

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
app.use('/api', limiter);
app.use(helmet())
app.use(hpp())
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(conf.cookieSecret));
app.use(
	mongoSanitize({
		replaceWith: '_',
	}),
);
app.use(
	cors({
		origin: process.env.CLIENT_URL || "http://localhost:5173",
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
		allowedHeaders: [
			"Content-Type",
			"Authorization",
			"X-Requested-With",
			"device-remember-token",
			"Access-Control-Allow-Origin",
			"Origin",
			"Accept",
		],
	})
);


// ROUTES

import userRoute from "./routes/UserRoute.js";
import { conf } from "./conf/conf.js";

app.use("/api/v1/user", userRoute);

app.use("healthroute", (req, res) => {
	res.status(200).json({ status: 200, message: "Health check done", success: true, })
})
export default app;
