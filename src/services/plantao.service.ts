// src/services/plantao.service.ts
import prisma from "../prismaClient";

export class PlantaoService {
  async create(data: any) {
    return prisma.plantao.create({ data });
  }

  async get(id: string) {
    return prisma.plantao.findUnique({ where: { id }, include: { local: true, escalas: true } });
  }

  async list() {
    return prisma.plantao.findMany({ include: { local: true } });
  }

  async update(id: string, data: any) {
    return prisma.plantao.update({ where: { id }, data });
  }

  async remove(id: string) {
    return prisma.plantao.delete({ where: { id } });
  }
}
