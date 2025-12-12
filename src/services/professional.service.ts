// src/services/professional.service.ts
import prisma from "../prismaClient";

export class ProfessionalService {
  async create(userId: number, cpf?: string, crf?: string) {
    return prisma.professional.create({
      data: { userId, cpf, crf }
    });
  }

  async getById(id: string) {
    return prisma.professional.findUnique({
      where: { id },
      include: { user: true, jornadas: true, escalas: true }
    });
  }

  async list(filters?: { name?: string; cpf?: string }) {
    const where: any = {};
    if (filters?.cpf) where.cpf = filters.cpf;
    if (filters?.name) {
      where.user = { name: { contains: filters.name, mode: "insensitive" } };
    }
    return prisma.professional.findMany({ where, include: { user: true } });
  }

  async update(id: string, data: Partial<{ cpf: string; crf: string; score: number }>) {
    return prisma.professional.update({ where: { id }, data });
  }
}
