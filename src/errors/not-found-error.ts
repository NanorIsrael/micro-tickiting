import CustomError from "./custom-error";

class NotFoundError extends CustomError {
	statusCode = 404;
	constructor() {
		super('Route not found')

		Object.setPrototypeOf(this, NotFoundError.prototype)
	}

	serializeError() {
		return [{  message: this.message, field: null }]
	}
}
export default NotFoundError;