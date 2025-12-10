// src/services/jornada.service.ts
import prisma from "../prismaClient";

export class JornadaService {
  async create(data: any) {
    return prisma.jornada.create({ data });
  }

  async listByProfessional(professionalId: string) {
    return prisma.jornada.findMany({ where: { professionalId } });
  }

  async get(id: string) {
    return prisma.jornada.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return prisma.jornada.update({ where: { id }, data });
  }

  async remove(id: string) {
    return prisma.jornada.delete({ where: { id } });
  }
}
