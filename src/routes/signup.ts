import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/req-validation-error";
import { DatabaseConnectionError } from "../errors/db-connection-error";
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
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    throw new DatabaseConnectionError();
    res.status(200).send("Hi there");
  },
);
export { router as signupRouter };
