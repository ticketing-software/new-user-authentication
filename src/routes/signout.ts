import { Request, Response, Router } from "express";

const route = Router();

route.get("/auth/signout", (request: Request, response: Response) => {
  response.send({
    message: "Successfully Signed Out",
  });
});

export { route as signOutRouter };
