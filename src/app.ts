import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { json } from "body-parser";
import { signUpRoute } from "./routes/signUp";
import { signInRoute } from "./routes/signin";
import { currentUserRouter } from "./routes/current-user";
import { signOutRouter } from "./routes/signout";
import "dotenv/config";
import { errorHandler } from "./middlewares/error-handler";
import PathNotFound from "./errors/path-not-found";
// import cors from "cors";

const app = express();

var cors = require("cors");

app.use(cors());
// app.set("trust-proxy", true);
app.use(json());

// Routes
app.use(signUpRoute);
app.use(signInRoute);
app.use(currentUserRouter);
app.use(signOutRouter);

app.all("*", async (request: Request) => {
  throw new PathNotFound("Not Found", request.path);
});

app.use(errorHandler);

export { app };
