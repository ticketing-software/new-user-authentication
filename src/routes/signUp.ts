import { Request, Response, Router } from "express";
import validateRequest from "../middlewares/validate-request";
import { body } from "express-validator";
import { User } from "../models/user";
import validateSignUp from "../middlewares/validate-signup";
import jwt from "jsonwebtoken";

import { serialize } from "cookie";

const router = Router();

router.post(
  "/api/users/signup",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  validateRequest,
  validateSignUp,
  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const user = User.build({ email, password });

    user.save();

    const theJsonWebToken = jwt.sign(
      { id: user.id, email: user.email },
      "asdf"
    );

    // response.cookie("user", theJsonWebToken, {
    //   expires: new Date(Date.now() + 900000),
    //   httpOnly: false,
    // });

    response.setHeader(
      "Set-Cookie",
      serialize("user", theJsonWebToken, {
        httpOnly: false,
        maxAge: 3600,
        path: "/",
        sameSite: true,
        secure: true,
      })
    );

    response.status(201).send({ user, accessToken: theJsonWebToken });
  }
);

export { router as signUpRoute };
