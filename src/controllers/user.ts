import { Request, Response } from "express";
import User from "../models/User";
import { UserI } from "../dtos/user";

/* REGISTER USER */
export const userProfile = async (req: Request, res: Response) => {
  try {
    const { photo, location, occupation, viewedProfileNumber, impressions } =
      req.body;

    const newUser = new User({
      photo,
      location,
      occupation,
      impressions,
      viewedProfileNumber,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occured");
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occured");
  }
};

export const getUserFriends = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: UserI | null = await User.findById(id);
    if (!user) {
      return res.status(400).json({ error: "invalid user id." });
    }

    const friends: UserI[] = (
      await Promise.all(user.friends.map((id) => User.findById(id)))
    ).filter(
      (friend): friend is any => friend !== null && friend !== undefined,
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, lacation, photo }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        lacation,
        photo,
      }),
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occured");
  }
};

/* UPDATES  */
export const addRemoveFriends = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occured");
  }
};
