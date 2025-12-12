import request from "supertest";
import app from "../../src/app"; // ✅ caminho corrigido

describe("Usuários", () => {
  let token = "";

  beforeAll(async () => {
    const login = await request(app)
      .post("/auth/login")
      .send({ email: "admin@neri.com", password: "123456" });

    token = login.body.token;
  });

  it("Criar usuário", async () => {
    const response = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Gabriel",       // ✅ padronizado com backend
        email: "gabriel@teste.com",
        password: "123456"    // ✅ padronizado com backend
      });

    expect(response.status).toBe(201);
  });

  it("Listar usuários", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
