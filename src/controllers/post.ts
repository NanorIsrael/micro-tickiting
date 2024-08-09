import { Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, description, postPhoto, postPhotoPath } = req.body;

    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      description,
      photo: postPhotoPath,
      likes: {},
      comments: [],
    });

    await newPost.save();
    const posts = await Post.find({});
    res.status(201).json(posts);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "an error occured." });
  }
};

export const getFeedPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const posts = await Post.find({ userId });
    console.log('--------->', posts, userId)
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "an error occured." });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ userId });
    console.log('--------->', posts, userId)
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "an error occured." });
  }
};

/* UPDATE */
export const likePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);
    const isLiked = post?.likes?.get(userId);

    if (!isLiked) {
      post?.likes?.set(userId, true);
    } else {
      post?.likes?.delete(userId);
    }

    const updatedPost = await Post.findByIdAndUpdate(id, {
      likes: post?.likes,
    });

    await updatedPost?.save();
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "an error occured." });
  }
};
