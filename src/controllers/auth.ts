import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import User from "../models/User";
import { UserI } from "../dtos/user";

/* REGISTER USER */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lasttName } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lasttName,
      password: hashedPassword,
      email,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occured");
  }
};

/* LOGGING IN USER */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: UserI | null = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "user does not exist." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "email and password do not match" });
    }
    const token = jwt.sign(
      { id: user._id },
      JSON.parse(process.env.JWT_SECRET as string),
    );

    res.status(200).json({ token });
  } catch (error) {}
};
