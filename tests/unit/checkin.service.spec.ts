import { CheckinService } from "../services/checkin.service";
import { AtendimentoRepository } from "../repositories/atendimento.repository";

jest.mock("../repositories/atendimento.repository");

describe("CheckinService", () => {
  let service: CheckinService;

  beforeEach(() => {
    service = new CheckinService();
  });

  it("deve registrar check-in dentro do raio permitido", async () => {
    (AtendimentoRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      localLat: -23.5,
      localLng: -46.6,
    });

    const result = await service.checkin(1, {
      lat: -23.5001,
      lng: -46.6001,
      foto: "foto.jpg",
    });

    expect(result.status).toBe("CHECKIN_OK");
  });

  it("deve recusar check-in fora do raio permitido", async () => {
    (AtendimentoRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      localLat: -23.5,
      localLng: -46.6,
    });

    await expect(
      service.checkin(1, {
        lat: -23.8, // MUITO LONGE
        lng: -46.8,
        foto: "foto.jpg",
      })
    ).rejects.toThrow("Check-in fora da área permitida");
  });
});
