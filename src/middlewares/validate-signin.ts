import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import EmailNotFound from "../errors/no-email-found";
import Password from "../utils/password-hash";
import IncorrectPassword from "../errors/incorrect-password";

const validateSignIn = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = request.body;

  const existingUser = await User.findOne({ email });

  //   When there is no user
  if (!existingUser) {
    throw new EmailNotFound("User Not Found");
  }

  const passwordMatch = await Password.compare(existingUser.password, password);

  if (!passwordMatch) {
    throw new IncorrectPassword("Given Password is incorrect");
  }

  request.body = existingUser;
  next();
};

export default validateSignIn;
