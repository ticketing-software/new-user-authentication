import { Request, Response, Router } from "express";

const route = Router();

route.get("/api/users/signout", (request: Request, response: Response) => {
  const cookieCheck = request.get("Cookie");

  if (!cookieCheck) {
    response.send({
      message: "You are not Signed In",
    });
  } else {
    response.clearCookie("user");

    response.send({
      message: "Successfully Signed Out",
    });
  }
});

export { route as signOutRouter };
