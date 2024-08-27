import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user";
import BadRequestError from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();
router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError("Invalid email");
    }

    const isMatch = await user.compare(password);

    if (!isMatch) {
      const error = new BadRequestError("Wrong password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY!,
    );

    req.session = {
      jwt: token,
    };
    res.status(200).json(user);
  },
);
export { router as signinRouter };
