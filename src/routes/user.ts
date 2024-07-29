import express from "express";

import {
  userProfile,
  getUser,
  getUserFriends,
  addRemoveFriends,
} from "../controllers/user";
import { verifyToken } from "../middleware/auth";
import { upload } from "../common/utils";

const userRouter = express.Router();

/* ROUTES */
userRouter.post("/profile", upload.single("photo"), userProfile);
userRouter.get("/:id", getUser);
userRouter.get("/:id/friends", verifyToken, getUserFriends);
userRouter.patch("/:id/friendId", verifyToken, addRemoveFriends);
export default userRouter;
