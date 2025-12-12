import request from "supertest";
import app from "../../src/app";

describe("Auth - Login", () => {
  it("Deve fazer login com sucesso", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "admin@neri.com",
        password: "123456"
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Deve falhar ao tentar logar com senha errada", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "admin@neri.com",
        password: "errado"
      });

    expect(response.status).toBe(400);
  });
});
