// src/services/professional.service.ts
import prisma from "../prismaClient";

export class ProfessionalService {

  // CREATE
  async create(userId: number, cpf?: string, crf?: string) {
    return prisma.professional.create({
      data: {
        userId: Number(userId), // ← GARANTE QUE É INT
        cpf,
        crf
      }
    });
  }

  // GET BY ID
  async getById(id: string) {
    return prisma.professional.findUnique({
      where: { id },
      include: {
        user: true,
        jornadas: true,
        Escala: true // ← nome correto da relação
      }
    });
  }

  // LIST
  async list(filters?: { name?: string; cpf?: string }) {
    const where: any = {};

    if (filters?.cpf) {
      where.cpf = filters.cpf;
    }

    if (filters?.name) {
      where.user = {
        name: { contains: filters.name, mode: "insensitive" }
      };
    }

    return prisma.professional.findMany({
      where,
      include: { user: true }
    });
  }

  // UPDATE
  async update(
  id: string,
  data: { cpf?: string; crf?: string; score?: number }
) {
  const updateData: any = {};

  if (data.cpf !== undefined) updateData.cpf = data.cpf;
  if (data.crf !== undefined) updateData.crf = data.crf;
  if (data.score !== undefined) updateData.score = data.score;

  return prisma.professional.update({
    where: { id },
    data: updateData
  });
}
}