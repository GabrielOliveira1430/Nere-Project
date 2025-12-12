import prisma from "../prismaClient";

interface TrackingData {
  profissionalId: string;
  plantaoId: string;
  latitude: number;
  longitude: number;
  speed?: number;
  bearing?: number;
  accuracy?: number;
}

export class TrackingService {
  async create(data: TrackingData) {
    return prisma.tracking.create({ data });
  }

  async listByProfessional(profissionalId: string) {
    return prisma.tracking.findMany({
      where: { profissionalId },
      orderBy: { createdAt: "desc" },
    });
  }

  async listByPlantao(plantaoId: string) {
    return prisma.tracking.findMany({
      where: { plantaoId },
      orderBy: { createdAt: "desc" },
    });
  }
}
