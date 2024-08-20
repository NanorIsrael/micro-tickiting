import express, {Request, Response} from "express";
import { body } from "express-validator";
const router = express.Router()

router.post('/api/users/signup',[
	body('email')
	.isEmail()
	.withMessage("email must be valid.")
], (req: Request, res: Response) => {
	const { email, password } = req.body;

	res.status(200).send("Hi there")
})
export { router as signupRouter}