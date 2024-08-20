import { Request, Response, NextFunction } from "express";
import { DatabaseConnectionError } from "../errors/db-connection-error";
import { RequestValidationError } from "../errors/req-validation-error";

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

	const formattedError = [{
		messsage: 'something went wrong',
		field: 'server'
	}]
	if (error instanceof RequestValidationError) {
		formattedError.length = 0;
		error.errors.forEach((err) => {
			formattedError.push({
				messsage: err.msg,
				field: err.type === 'field' ? err.path : 'unknown field'
			})
		})
		return res.status(400).json({errors: formattedError})
	}
	if (error instanceof DatabaseConnectionError) {
		formattedError.length = 0;
		formattedError.push({
			messsage: error.reasons,
			field: 'db'
		})
		return res.status(500).json({errors: formattedError})
	}
	res.status(statusCode).json({errors: formattedError})
}
export default errorHandler;