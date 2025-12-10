// src/services/atividade.service.ts
import prisma from "../prismaClient";

export class AtividadeService {
  async create(data: any) {
    return prisma.atividade.create({ data });
  }

  async updateStatus(id: string, estado: string) {
    return prisma.atividade.update({ where: { id }, data: { estado } });
  }

  async listByAtendimento(atendimentoId: string) {
    return prisma.atividade.findMany({ where: { atendimentoId } });
  }
}
