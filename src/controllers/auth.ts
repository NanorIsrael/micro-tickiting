import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import User from '../models/User'


/* REGISTER USER */ 
export const register = async(req: Request, res: Response) => {
	try {
		const  {email, password, firstName, lasttName} = req.body;

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			firstName,
			lasttName,
			password: hashedPassword,
			email
		});
		const savedUser = await newUser.save();
		res.status(201).json(savedUser)
	} catch (error) {
		console.log(error)
		res.status(500).json('An error occured');
	}
} 