import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    console.log("Inside if statement inside error handler");

    return response
      .status(error.statusCode)
      .send({ errors: error.serializeErrors() });
  }

  response.status(400).send({
    errors: [{ message: "Something Went Wrong" }],
  });
};

export { errorHandler };
