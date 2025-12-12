describe("Jornada", () => {
  let token = "";
  let jornadaId = "";

  beforeAll(async () => {
    const login = await request(app)
      .post("/auth/login")
      .send({ email: "admin@neri.com", password: "123456" });

    token = login.body.token;
  });

  it("Criar jornada", async () => {
    const response = await request(app)
      .post("/jornadas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        horasDia: 8,
        horasSemana: 44,
        intervaloMin: 60
      });

    jornadaId = response.body.id;
    expect(response.status).toBe(201);
  });

  it("Buscar jornadas", async () => {
    const response = await request(app)
      .get("/jornadas")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
