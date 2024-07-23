import express from "express";
import multer from "multer";

import {
  userProfile,
  getUser,
  getUserFriends,
  addRemoveFriends,
} from "../controllers/user";
import { verifyToken } from "../middleware/auth";

const userRouter = express();

// file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES */
userRouter.post("profile", upload.single("photo"), userProfile);
userRouter.get("/:id", verifyToken, getUser);
userRouter.get("/:id/friends", verifyToken, getUserFriends);
userRouter.patch("/:id/friendId", verifyToken, addRemoveFriends);
export default userRouter;
