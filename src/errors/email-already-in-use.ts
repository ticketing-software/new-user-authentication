import { CustomError } from "./custom-error";

class EmailAlreadyInUse extends CustomError {
  statusCode = 403;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, EmailAlreadyInUse.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export { EmailAlreadyInUse };
