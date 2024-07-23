import User from '../models/User'
import { Request, Response } from 'express';


/* REGISTER USER */ 
export const userProfile = async(req: Request, res: Response) => {
	try {
		const { photo,
			location,
			occupation,
			viewedProfileNumber,
			impressions
		} = req.body;

		const newUser = new User({
			photo,
			location,
			occupation,
			impressions,
			viewedProfileNumber
		});

		const savedUser = await newUser.save();
		res.status(201).json(savedUser)
	} catch (error) {
		console.log(error)
		res.status(500).json('An error occured');
	}
} 