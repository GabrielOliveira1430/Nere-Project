import prisma from "../prismaClient";

export class AtendimentoService {
  async create(data: any) {
    // data: pacienteId, inicioPrevisto, fimPrevisto, localId, tipo...
    return prisma.atendimento.create({ data: { ...data, status: "PENDENTE" } });
  }

  async allocate(atendimentoId: string, professionalId: string) {
    return prisma.atendimento.update({
      where: { id: atendimentoId },
      data: { professionalId, status: "ALOCADO" }
    });
  }

  async checkin(atendimentoId: string, latitude: number, longitude: number, fotoUrl?: string) {
    const now = new Date();
    // aqui validar proximidade usando util geo
    return prisma.atendimento.update({
      where: { id: atendimentoId },
      data: { inicioReal: now, status: "EM_EXECUCAO" }
    });
  }

  async checkout(atendimentoId: string) {
    const now = new Date();
    return prisma.atendimento.update({
      where: { id: atendimentoId },
      data: { fimReal: now, status: "CONCLUIDO" }
    });
  }
}
