import { Request, Response, Router } from "express";
import validateRequest from "../middlewares/validate-request";
import { body } from "express-validator";
import validateSignIn from "../middlewares/validate-signin";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/api/users/signin",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  validateRequest,
  validateSignIn,
  (request: Request, response: Response) => {
    // Getting data from the middleware
    const { _id, email } = request.body;

    const jwtToken = jwt.sign({ id: _id, email }, "asdf");

    response.cookie("user", jwtToken, {
      expires: new Date(Date.now() + 900000),
      httpOnly: false,
      sameSite: true,
      // secure: true,
    });

    response.send({
      message: "Signed in successfully",
      email,
      accessToken: jwtToken,
    });
  }
);

export { router as signInRoute };
