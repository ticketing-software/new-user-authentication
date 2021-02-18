import { CustomError } from "./custom-error";

class NoEmailFoundException extends CustomError {
  statusCode = 404;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, NoEmailFoundException.prototype);
  }

  serializeErrors() {
    return [{ message: "Email not found" }];
  }
}

export default NoEmailFoundException;
