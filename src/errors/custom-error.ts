abstract class CustomError extends Error {
	abstract readonly statusCode: number
	constructor(readonly message: string) {
		super(message)

		Object.setPrototypeOf(this, CustomError.prototype)
	}

	abstract serializeError(): { message: string, field?: string | null }[]
}


export default CustomError;