import express from "express";

const router = express.Router()
router.post('/api/users/signup', (req, res) => {
	res.status(200).send("Hi there")
})
export { router as signupRouter}