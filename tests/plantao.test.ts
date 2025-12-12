describe("Plantões / Escala", () => {
  let token = "";
  let plantaoId = "";

  beforeAll(async () => {
    const login = await request(app)
      .post("/auth/login")
      .send({ email: "admin@neri.com", password: "123456" });

    token = login.body.token;
  });

  it("Criar plantão", async () => {
    const response = await request(app)
      .post("/plantoes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Plantão UPA Manhã",
        inicio: "2025-01-10T07:00:00",
        fim: "2025-01-10T13:00:00"
      });

    plantaoId = response.body.id;
    expect(response.status).toBe(201);
  });

  it("Listar plantões", async () => {
    const response = await request(app)
      .get("/plantoes")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
