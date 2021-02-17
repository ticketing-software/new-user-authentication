import express from "express";
import { json } from "body-parser";
import { signUpRoute } from "./routes/signUp";
import { signInRoute } from "./routes/signin";
import { currentUserRouter } from "./routes/current-user";
import { signOutRouter } from "./routes/signout";
import "dotenv/config";
import { connectDB } from "./db-connection";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(json());

// Routes
app.use(signUpRoute);
app.use(signInRoute);
app.use(currentUserRouter);
app.use(signOutRouter);

// Connecting to the Database
connectDB();

app.listen(PORT, () => {
  console.log(`Started Authentication Service at ${PORT}`);
});
