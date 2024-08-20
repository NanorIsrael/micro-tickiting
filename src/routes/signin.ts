import express from "express";

const router = express.Router();
router.get("/api/users/signin", (req, res) => {
  res.status(200).send("Hi there");
});
export { router as signinRouter };
