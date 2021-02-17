import { Request, Response, Router } from "express";

const router = Router();

router.get("/api/current-user", (request: Request, response: Response) => {
  response.send({
    user: "Achyuth Varma",
  });
});

export { router as currentUserRouter };
