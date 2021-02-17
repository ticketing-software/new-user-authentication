import { Request, Response, Router } from "express";
import validateRequest from "../middlewares/validate-request";
import { body } from "express-validator";

const router = Router();

router.post(
  "/auth/signin",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  validateRequest,
  (request: Request, response: Response) => {
    const { email, password } = request.body;

    response.send({
      email,
      password,
    });
  }
);

export { router as signInRoute };
