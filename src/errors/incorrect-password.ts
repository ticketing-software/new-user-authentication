import { CustomError } from "./custom-error";

class IncorrectPassword extends CustomError {
  statusCode = 403;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, IncorrectPassword.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default IncorrectPassword;
