describe("Vínculos do sistema", () => {
  let token = "";

  beforeAll(async () => {
    const login = await request(app)
      .post("/auth/login")
      .send({ email: "admin@neri.com", password: "123456" });

    token = login.body.token;
  });

  it("Vincular profissional a plantão", async () => {
    const response = await request(app)
      .post("/plantoes/1/profissionais/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("Vincular atividade ao plantão", async () => {
    const response = await request(app)
      .post("/plantoes/1/atividades/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("Vincular local ao atendimento", async () => {
    const response = await request(app)
      .post("/atendimentos/1/locais/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
