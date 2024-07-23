import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";

import userRouter from "./src/routes/user";
import authRouter from "./src/routes/auth";
// configs
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* ROUTES */
app.use("auth", authRouter);
app.use("users", userRouter);

const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() =>
    app.listen(PORT, () => console.log("Sever running on port " + PORT)),
  )
  .catch((error) => console.log(`${error}`));
