describe("Atividades", () => {
  let token = "";
  let atividadeId = "";

  beforeAll(async () => {
    const login = await request(app)
      .post("/auth/login")
      .send({ email: "admin@neri.com", password: "123456" });

    token = login.body.token;
  });

  it("Criar atividade", async () => {
    const response = await request(app)
      .post("/atividades")
      .set("Authorization", `Bearer ${token}`)
      .send({
        titulo: "Curativo",
        duracaoMin: 30
      });

    atividadeId = response.body.id;
    expect(response.status).toBe(201);
  });

  it("Listar atividades", async () => {
    const response = await request(app)
      .get("/atividades")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
