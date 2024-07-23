import express from 'express'
import { register } from '../controllers/auth';


const authRouter = express.Router();

authRouter.post('signup', register)

export default authRouter;