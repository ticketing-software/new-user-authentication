import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import currentUserVerification from "../middlewares/current-user-verification";

const router = Router();

interface UserPayload {
  id: string;
  email: string;
}

router.get(
  "/api/users/currentuser",
  currentUserVerification,
  (request: Request, response: Response) => {
    response.send({
      user: request.body,
    });
  }
);

export { router as currentUserRouter };
