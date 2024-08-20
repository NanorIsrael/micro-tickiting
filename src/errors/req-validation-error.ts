import { ValidationError} from "express-validator";
import CustomError from "./custom-error";


export class RequestValidationError extends CustomError {
	statusCode = 400;

	constructor(readonly errors: ValidationError[]) {
		super('Request error');
		Object.setPrototypeOf(this, RequestValidationError.prototype)
	}

	serializeError(): { message: string; field?: string | null | undefined; }[] {
		return this.errors.map((err) => ({
				message: err.msg,
				field: err.type === 'field' ? err.path : null
			})
		)
	}
}