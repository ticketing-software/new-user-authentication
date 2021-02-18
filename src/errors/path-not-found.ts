import { CustomError } from "./custom-error";

class PathNotFound extends CustomError {
  statusCode = 404;

  constructor(public message: string, public path?: string) {
    super(message);

    Object.setPrototypeOf(this, PathNotFound.prototype);
  }

  serializeErrors() {
    return [
      { message: this.path ? `Path ${this.path} not found` : this.message },
    ];
  }
}
export default PathNotFound;
