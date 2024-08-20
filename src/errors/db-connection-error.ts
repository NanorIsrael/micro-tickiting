

export class DatabaseConnectionError extends Error {
	readonly reasons = "error connecting to database."
	constructor() {
		super();
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
	}
	
}