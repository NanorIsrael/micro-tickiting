import express from "express";
import jwt from "jsonwebtoken";
import { currentUser } from "../middlewares/very-user";

const router = express.Router();
router.get("/api/users/current-user", currentUser, (req, res) => {
    return res.json({ currentUser: req.currentUser || null });
});
export { router as currentUserRouter }; 
