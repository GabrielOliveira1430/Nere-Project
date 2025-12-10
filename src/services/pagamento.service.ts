// src/services/pagamento.service.ts
import prisma from "../prismaClient";

export class PagamentoService {
  async createForAtendimento(atendimentoId: string, valorBruto: number, taxaPlataforma = 0.1) {
    const taxa = valorBruto * taxaPlataforma;
    const liquido = valorBruto - taxa;
    return prisma.pagamento.create({
      data: {
        atendimentoId,
        valorBruto,
        taxaPlataforma: taxa,
        valorLiquido: liquido,
        status: "PENDENTE"
      }
    });
  }

  async get(id: string) {
    return prisma.pagamento.findUnique({ where: { id }, include: { atendimento: true } });
  }

  async setStatus(id: string, status: string) {
    return prisma.pagamento.update({ where: { id }, data: { status } });
  }
}
