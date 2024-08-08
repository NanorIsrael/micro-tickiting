import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User";
import { UserI } from "../dtos/user";

/* REGISTER USER */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      password: hashedPassword,
      email,
    });

    const savedUser: any = await newUser.save();
    const clonedUser: { password?: string } = Object.assign({}, savedUser._doc);
    delete clonedUser.password;
    res.status(201).json(clonedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json("An §error occured");
  }
};

/* LOGGING IN USER */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: UserDoc | null = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user._doc.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "email and password do not match" });
    }

    const jwtSecret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: user._doc._id }, jwtSecret);

    const clonedUser: { password?: string } = user._doc;
    delete clonedUser.password;
    res.status(200).json({ token, user: clonedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json("An §error occured");
  }
};

interface UserDoc {
  $isNew: boolean;
  _doc: UserI;
}
