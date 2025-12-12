import { AuthService } from "../../src/services/auth.service";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

jest.mock("../repositories/user.repository");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it("deve registrar um novo usuário", async () => {
    (UserRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed123");

    (UserRepository.create as jest.Mock).mockResolvedValue({
      id: 1,
      email: "teste@mail.com",
      password: "hashed123",
    });

    const result = await authService.register({
      name: "Gabriel",
      email: "teste@mail.com",
      password: "123456",
    });

    expect(result.email).toBe("teste@mail.com");
    expect(UserRepository.create).toHaveBeenCalledWith();
  });

  it("deve fazer login corretamente", async () => {
    (UserRepository.findByEmail as jest.Mock).mockResolvedValue({
      id: 1,
      email: "teste@mail.com",
      password: "hashed123",
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    (jwt.sign as jest.Mock).mockReturnValue("TOKEN123");

    const result = await authService.login({
      email: "teste@mail.com",
      password: "123456",
    });

    expect(result.token).toBe("TOKEN123");
  });

  it("deve falhar ao fazer login com senha inválida", async () => {
    (UserRepository.findByEmail as jest.Mock).mockResolvedValue({
      id: 1,
      email: "teste@mail.com",
      password: "hashed123",
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      authService.login({ email: "teste@mail.com", password: "errada" })
    ).rejects.toThrow("Senha inválida");
  });
});
