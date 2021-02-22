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

var allowedOrigins = ["http://localhost:3000", "https://achyuthvarma.com"];

app.use(
  cors({
    origin: function (origin: any, callback: any) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    credentials: true,
  })
);

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
