import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import NotAuthorizedError from "../errors/not-authorized";
import BadRequestError from "../errors/bad-request-error";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
	namespace Express {
		interface Request {
			currentUser: UserPayload | null
		}
	}
}
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    throw new NotAuthorizedError();
  }

  try {
    const user = jwt.verify(
      req.session?.jwt,
      process.env.JWT_KEY!,
    ) as UserPayload;
    req.currentUser = user;
  } catch (error) {
    throw new BadRequestError('An error occured');
  }
  next()
};
