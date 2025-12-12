describe("Atendimento", () => {
  let token = "";
  let atendimentoId = "";

  beforeAll(async () => {
    const login = await request(app)
      .post("/auth/login")
      .send({ email: "admin@neri.com", password: "123456" });

    token = login.body.token;
  });

  it("Criar atendimento", async () => {
    const response = await request(app)
      .post("/atendimentos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        paciente: "Maria da Silva",
        data: "2025-01-15T14:00:00"
      });

    atendimentoId = response.body.id;
    expect(response.status).toBe(201);
  });

  it("Listar atendimentos", async () => {
    const response = await request(app)
      .get("/atendimentos")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
