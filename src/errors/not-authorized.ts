import CustomError from "./custom-error";

class NotAuthorizedError extends CustomError {
  readonly statusCode = 401;
  constructor() {
    super("Not authorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeError() {
    return [{ message: this.message, field: null }];
  }
}
export default NotAuthorizedError;
