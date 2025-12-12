describe("Locais", () => {
  let token = "";
  let localId = "";

  beforeAll(async () => {
    const login = await request(app)
      .post("/auth/login")
      .send({ email: "admin@neri.com", password: "123456" });

    token = login.body.token;
  });

  it("Criar local", async () => {
    const response = await request(app)
      .post("/locais")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "UPA Centro",
        latitude: -23.55,
        longitude: -46.63
      });

    localId = response.body.id;
    expect(response.status).toBe(201);
  });

  it("Listar locais", async () => {
    const response = await request(app)
      .get("/locais")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
