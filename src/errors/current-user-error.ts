import { CustomError } from "./custom-error";

class CurrentUserError extends CustomError {
  statusCode = 403;

  constructor(public message: string) {
    super(message);

    // Puts CustomError into 'this' object
    Object.setPrototypeOf(this, CurrentUserError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default CurrentUserError;
