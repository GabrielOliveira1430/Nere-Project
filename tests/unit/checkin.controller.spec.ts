import { CheckinController } from "../../src/controllers/checkin.controller";
import { CheckinService } from "../../src/services/checkin.service";

jest.mock("../services/checkin.service");

describe("CheckinController", () => {
  let controller: CheckinController;
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    controller = new CheckinController();

    mockReq = {
      params: {},
      body: {},
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("deve registrar um check-in válido", async () => {
    mockReq.params.id = 1;
    mockReq.body = {
      lat: -23.5,
      lng: -46.6,
      foto: "foto.jpg",
    };

    (CheckinService.prototype.checkin as jest.Mock).mockResolvedValue({
      status: "CHECKIN_OK",
    });

    await controller.checkin(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ status: "CHECKIN_OK" });
  });

  it("deve retornar erro caso check-in falhe", async () => {
    mockReq.params.id = 1;
    mockReq.body = {
      lat: -23.5,
      lng: -46.6,
      foto: "foto.jpg",
    };

    (CheckinService.prototype.checkin as jest.Mock).mockRejectedValue(
      new Error("Check-in fora da área permitida")
    );

    await controller.checkin(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
  });
});
