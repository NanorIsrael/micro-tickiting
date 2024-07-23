import express from "express";
import { register, login } from "../controllers/auth";

const authRouter = express.Router();

authRouter.post("/signup", register);
authRouter.post("/signin", login);

export default authRouter;
