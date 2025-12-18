// src/services/PlantaoService.ts
import prisma from "../prismaClient";
import { UserRole, StatusPlantao } from "@prisma/client";

interface UpdatePlantaoDTO {
  data?: Date;
  status?: StatusPlantao;
  localId?: string;
}

export class PlantaoService {
  async create(data: any) {
    return prisma.plantao.create({ data });
  }

  async update(
    plantaoId: string,
    userId: number,
    userRole: UserRole,
    data: UpdatePlantaoDTO
  ) {
    const plantao = await prisma.plantao.findUnique({
      where: { id: plantaoId },
      include: { profissional: true },
    });

    if (!plantao) throw new Error("Plantão não encontrado");

    // Ownership
    if (userRole === UserRole.PROFISSIONAL) {
      if (!plantao.profissionalId) throw new Error("Plantão sem profissional");
      const professional = await prisma.professional.findUnique({ where: { userId } });
      if (!professional || professional.id !== plantao.profissionalId) {
        throw new Error("Você não pode alterar este plantão");
      }
    }

    // Status rules
    if (plantao.status === StatusPlantao.CANCELADO)
      throw new Error("Plantão cancelado não pode ser alterado");
    if (plantao.status === StatusPlantao.CONFIRMADO && userRole !== UserRole.ADMIN)
      throw new Error("Apenas ADMIN pode alterar plantão confirmado");

    return prisma.plantao.update({ where: { id: plantaoId }, data });
  }

  async remove(plantaoId: string, userId: number, userRole: UserRole) {
    const plantao = await prisma.plantao.findUnique({ where: { id: plantaoId } });
    if (!plantao) throw new Error("Plantão não encontrado");

    if (userRole === UserRole.PROFISSIONAL) {
      const professional = await prisma.professional.findUnique({ where: { userId } });
      if (!professional || professional.id !== plantao.profissionalId) {
        throw new Error("Você não pode remover este plantão");
      }
    }

    return prisma.plantao.delete({ where: { id: plantaoId } });
  }

  async getById(id: string) {
    const plantao = await prisma.plantao.findUnique({ where: { id } });
    if (!plantao) throw new Error("Plantão não encontrado");
    return plantao;
  }

  async list() {
    return prisma.plantao.findMany({ orderBy: { data: "asc" } });
  }
}
