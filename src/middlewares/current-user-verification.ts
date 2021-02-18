import { Request, Response, NextFunction } from "express";
import CurrentUserError from "../errors/current-user-error";
import jwt from "jsonwebtoken";

const currentUserVerification = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const getCookie = request.get("Cookie");

  if (!getCookie) {
    throw new CurrentUserError("Unable to verify current user");
  }

  const getJWT = getCookie.split("=")[1];

  const payload = jwt.verify(getJWT, "asdf");

  request.body = payload;

  next();
};

export default currentUserVerification;
