describe("Profissionais", () => {
  let token = "";
  let profissionalId = "";

  beforeAll(async () => {
    const login = await request(app)
      .post("/auth/login")
      .send({ email: "admin@neri.com", password: "123456" });
    token = login.body.token;
  });

  it("Criar profissional", async () => {
    const response = await request(app)
      .post("/profissionais")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Enfermeiro João",
        documento: "12312312312",
        tipo: "Enfermeiro"
      });

    profissionalId = response.body.id;
    expect(response.status).toBe(201);
  });

  it("Listar profissionais", async () => {
    const response = await request(app)
      .get("/profissionais")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
