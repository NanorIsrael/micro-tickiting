import express from "express";
import { register, login } from "../controllers/auth";
import { upload } from "../common/utils";

const authRouter = express.Router();

authRouter.post("/signup", upload.single('photo'), register);
authRouter.post("/signin", login);

export default authRouter;
