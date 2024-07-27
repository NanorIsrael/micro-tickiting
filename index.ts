import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import createError from 'http-errors';
import userRouter from "./src/routes/user";
import authRouter from "./src/routes/auth";
import postRouter from "./src/routes/post";
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
app.use("/", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
   next(createError(404))
});

app.use((error: Error, req: Request, res: Response) => {
	/* handle custom errors */
   res.json({error: error.message });
});

const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() =>
    app.listen(PORT, () => console.log("Sever running on port " + PORT)),
  )
  .catch((error) => console.log(`${error}`));
