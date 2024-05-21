import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { createServer } from "./bin/server";

import indexRouter from "./routes/index";
import adminAuthRouter from "./routes/adminAuthRouter";
import teamLeadeRouter from "./routes/teamLeadController";

//initialize express app
const app = express();

// This line sets up Morgan middleware to log HTTP requests to the console using the "dev" format.
app.use(morgan("dev"));

// This line sets up bodyParser middleware to parse incoming JSON requests.
app.use(bodyParser.json());

// This line sets up bodyParser middleware to parse incoming URL-encoded requests with extended mode enabled.
app.use(bodyParser.urlencoded({ extended: true }));

// This line sets up compression middleware to compress HTTP responses before sending them to the client.
app.use(compression());

// This line sets up cookieParser middleware to parse cookies attached to incoming requests.
app.use(cookieParser());

// This line mounts the indexRouter at the root path of the app.
app.use("/", indexRouter);

// This line mounts the adminAuthRouter at the "/admin" path of the app.
app.use("/api/admin", adminAuthRouter);

// This line mounts the teamLeadeRouter at the "/teamlead" path of the app.
app.use("/api/teamlead", teamLeadeRouter);

createServer(app);
