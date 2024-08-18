import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";

// configs
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* ROUTES */
app.get("/api/users/currentuser", (req, res) => {
  res.status(200).send("Hi there")
})

// Middleware for handling 404 errors
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  res.status(404);
  next(error);
});

// General error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: error.message,
  });
});

const PORT = process.env.PORT || 8000;
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() =>
    app.listen(PORT, () => console.log("Sever running on port " + PORT)),
  )
  .catch((error) => console.log(`${error}`));
