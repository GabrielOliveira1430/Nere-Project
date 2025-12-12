import { AuthController } from "../../src/controllers/auth.controller";
import { AuthService } from "../../src/services/auth.service";

jest.mock("../../src/services/auth.service");

describe("AuthController", () => {
  let authController: AuthController;
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    authController = new AuthController();

    mockReq = { body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("deve retornar token no login", async () => {
    mockReq.body = { email: "teste@mail.com", password: "123456" };

    (AuthService.prototype.login as jest.Mock).mockResolvedValue({
      token: "TOKEN123",
    });

    await authController.login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ token: "TOKEN123" });
  });

  it("deve retornar erro ao falhar", async () => {
    mockReq.body = { email: "teste@mail.com", password: "errada" };

    (AuthService.prototype.login as jest.Mock).mockRejectedValue(
      new Error("Senha inválida")
    );

    await authController.login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
  });
});
