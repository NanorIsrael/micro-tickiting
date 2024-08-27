import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user";
import BadRequestError from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.get("/api/users/signup", (req, res) => {
  res.send("hi micro-service");
});

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("email must be valid."),
    body("password")
      .isLength({ min: 4, max: 20 })
      .withMessage("password must between 4 and 20 charaters."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email is in use.");
    }

    const newUser = User.build({ email, password });
    const savedUser = await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_KEY!,
    );

    req.session = {
      jwt: token,
    };
    res.status(201).json(savedUser);
  },
);
export { router as signupRouter };
