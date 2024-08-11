import express from "express";

import {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/post";
import { verifyToken } from "../middleware/auth";
import { upload } from "../common/utils";

const postRouter = express.Router();

/* CREATE */
postRouter.post("/", upload.single("postPhoto"), verifyToken, createPost);
postRouter.get("/", verifyToken, getFeedPosts);
postRouter.get("/:id", verifyToken, getUserPosts);
postRouter.put("/:id/like", verifyToken, likePost);

export default postRouter;
