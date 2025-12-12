describe("Regime", () => {
  let token = "";
  let regimeId = "";

  beforeAll(async () => {
    const login = await request(app)
      .post("/auth/login")
      .send({ email: "admin@neri.com", password: "123456" });
    token = login.body.token;
  });

  it("Criar regime", async () => {
    const response = await request(app)
      .post("/regimes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "12x36",
        tipo: "plantao"
      });

    regimeId = response.body.id;
    expect(response.status).toBe(201);
  });

  it("Listar regimes", async () => {
    const response = await request(app)
      .get("/regimes")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
