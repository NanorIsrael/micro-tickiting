import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import errorHandler from "./middlewares/error-handler";
import NotFoundError from "./errors/not-found-error";

// configs
dotenv.config();
const app = express();
app.set("trust proxy", true);
app.use(
  cookieSession({
    secure: false,
    signed: false,
  }),
);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* ROUTES */
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all("*", async () => {
  throw new NotFoundError();
});

// General error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
const start = async function () {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  const DB_URL = process.env.DB_URL;

  if (!process.env.DB_URL) {
    throw new Error("DB_URL must be defined");
  }

  try {
    await mongoose.connect(DB_URL!);
  } catch (err) {
    console.log(err);
  }
  app.listen(PORT, () => console.log("Sever running on port " + PORT));
};
start();
