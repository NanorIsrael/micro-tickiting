import CustomError from "./custom-error";


export class DatabaseConnectionError extends CustomError {
	statusCode: number = 500;
	readonly reason = "error connecting to database."

	constructor() {
		super("error connecting to database.");
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
	}

	serializeError(): { message: string; field?: string | null | undefined; }[] {
		return [{
			message: this.reason,
			field: null
		}]
	}
}