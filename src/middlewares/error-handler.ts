import { Request, Response, NextFunction } from "express";
import CustomError from "../errors/custom-error";

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

	const formattedError = [{
		messsage: 'something went wrong',
		field: null
	}]

	if (error instanceof CustomError) {
		return res.status(400).json({errors: error.serializeError()})
	}
	
	res.status(statusCode).json({errors: formattedError})
}
export default errorHandler;