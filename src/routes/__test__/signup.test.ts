import { app } from "../../app";
import request from "supertest";

it("Testing Sign Up", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
});
