import { Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = await User.findById(userId);
    const newPost = new Post({
      description,
      photo: picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();
    const posts = await Post.find({});
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({ error: "an error occured." });
  }
};
