import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
router.get("/api/users/current-user", (req, res) => {
  if (!req.session?.jwt) {
    return res.status(401).json({ currentUser: null });
  }
  try {
    const user = jwt.verify(req.session?.jwt, process.env.JWT_KEY!);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ currentUser: null });
  }
});
export { router as currentUserRouter };
