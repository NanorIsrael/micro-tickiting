import express from "express";

import { createPost } from "../controllers/post";
import { verifyToken } from "../middleware/auth";
import { upload } from "../common/utils";

const postRouter = express.Router();

/* CREATE */
postRouter.post("/post", verifyToken, upload.single("photo"), createPost);

export default postRouter;
