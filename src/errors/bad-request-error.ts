import CustomError from "./custom-error";

class BadRequestError extends CustomError {
  statusCode: number = 400;
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError(): { message: string; field?: string | null }[] {
    return [
      {
        message: this.message,
        field: null,
      },
    ];
  }
}
export default BadRequestError;
