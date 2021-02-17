import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { EmailAlreadyInUse } from "../errors/email-already-in-use";

const validateSignUp = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email } = request.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new EmailAlreadyInUse(
      "Given Email is already used! Please choose another one"
    );
  } else next();
};

export default validateSignUp;
