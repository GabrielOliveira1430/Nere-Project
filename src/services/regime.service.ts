// src/services/regime.service.ts
import prisma from "../prismaClient";

export class RegimeService {
  async create(data: { nome: string; tipo: string; horasMaxDia: number; horasMaxSemana: number; permitePlantao?: boolean }) {
    return prisma.regime.create({ data });
  }

  async list() {
    return prisma.regime.findMany();
  }

  async get(id: string) {
    return prisma.regime.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<any>) {
    return prisma.regime.update({ where: { id }, data });
  }

  async remove(id: string) {
    return prisma.regime.delete({ where: { id } });
  }
}
