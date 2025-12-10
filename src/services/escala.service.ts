// src/services/escala.service.ts
import prisma from "../prismaClient";

export class EscalaService {
  async create(data: { plantaoId: string; professionalId: string; turnoInicio: string; turnoFim: string }) {
    return prisma.escala.create({ data });
  }

  async listByPlantao(plantaoId: string) {
    return prisma.escala.findMany({ where: { plantaoId }, include: { professional: { include: { user: true } } } });
  }

  async remove(id: string) {
    return prisma.escala.delete({ where: { id } });
  }
}
