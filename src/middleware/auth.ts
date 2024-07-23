import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const header = req.header("Authorization");

    if (!header) {
      return res.status(403).json({ error: "access token not found." });
    }
    if (header.startsWith("Bearer ")) {
      const token = header.slice(7, header.length).trim();
      const verified = jwt.verify(token, process.env.JWT_SECRET as string);
      req.body = { ...req.body, verified };
      next();
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
