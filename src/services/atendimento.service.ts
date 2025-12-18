import prisma from "../prismaClient";
import { StatusAtendimento } from "@prisma/client";

interface CreateAtendimentoDTO {
  pacienteId: string;
  plantaoId?: string;
  professionalId?: string;
  localId: string;
  inicioPrevisto: Date;
  fimPrevisto: Date;
}

export class AtendimentoService {
  /**
   * Cria um atendimento
   * - PROFISSIONAL e ADMIN podem criar
   */
  async create(data: CreateAtendimentoDTO) {
    // Verifica plantão, se fornecido
    if (data.plantaoId) {
      const plantao = await prisma.plantao.findUnique({
        where: { id: data.plantaoId },
      });
      if (!plantao) throw new Error("Plantão não encontrado");
      if (plantao.status === "CANCELADO")
        throw new Error(
          "Não é possível vincular atendimento a plantão cancelado"
        );
    }

    const atendimento = await prisma.atendimento.create({
      data: {
        ...data,
        status: StatusAtendimento.PENDENTE,
      },
    });

    return atendimento;
  }

  /**
   * Realiza check-in do atendimento
   * - Somente PROFISSIONAL responsável pode fazer
   */
  async checkin(atendimentoId: string, userId: string) {
    const atendimento = await prisma.atendimento.findUnique({
      where: { id: atendimentoId },
      include: { professional: true },
    });

    if (!atendimento) throw new Error("Atendimento não encontrado");
    if (!atendimento.professionalId)
      throw new Error("Atendimento ainda não possui profissional alocado");

    // Ownership
    const profissional = await prisma.professional.findUnique({
      where: { userId: Number(userId) },
    });

    if (!profissional || profissional.id !== atendimento.professionalId)
      throw new Error("Você não tem permissão para realizar check-in");

    // Status
    if (
      atendimento.status !== StatusAtendimento.PENDENTE &&
      atendimento.status !== StatusAtendimento.ALOCADO
    )
      throw new Error(
        "Atendimento não pode receber check-in neste status"
      );

    return prisma.atendimento.update({
      where: { id: atendimentoId },
      data: {
        status: StatusAtendimento.EM_EXECUCAO,
        inicioReal: new Date(),
      },
    });
  }

  /**
   * Realiza check-out do atendimento
   * - Somente PROFISSIONAL responsável pode fazer
   */
  async checkout(atendimentoId: string, userId: string) {
    const atendimento = await prisma.atendimento.findUnique({
      where: { id: atendimentoId },
      include: { professional: true },
    });

    if (!atendimento) throw new Error("Atendimento não encontrado");
    if (!atendimento.professionalId)
      throw new Error("Atendimento ainda não possui profissional alocado");

    // Ownership
    const profissional = await prisma.professional.findUnique({
      where: { userId: Number(userId) },
    });

    if (!profissional || profissional.id !== atendimento.professionalId)
      throw new Error("Você não tem permissão para realizar check-out");

    // Status
    if (atendimento.status !== StatusAtendimento.EM_EXECUCAO)
      throw new Error(
        "Atendimento não pode receber check-out neste status"
      );

    return prisma.atendimento.update({
      where: { id: atendimentoId },
      data: {
        status: StatusAtendimento.CONCLUIDO,
        fimReal: new Date(),
      },
    });
  }

  /**
   * Atualiza um atendimento
   */
  async update(
    atendimentoId: string,
    userId: string,
    userRole: string,
    data: Partial<CreateAtendimentoDTO>
  ) {
    const atendimento = await prisma.atendimento.findUnique({
      where: { id: atendimentoId },
      include: { professional: true },
    });

    if (!atendimento) throw new Error("Atendimento não encontrado");

    // Ownership: apenas profissional responsável pode atualizar
    if (userRole === "PROFISSIONAL") {
      const profissional = await prisma.professional.findUnique({
        where: { userId: Number(userId) },
      });
      if (!profissional || profissional.id !== atendimento.professionalId)
        throw new Error("Você não tem permissão para atualizar este atendimento");
    }

    return prisma.atendimento.update({
      where: { id: atendimentoId },
      data,
    });
  }

  /**
   * Retorna um atendimento pelo ID
   */
  async getById(atendimentoId: string) {
    const atendimento = await prisma.atendimento.findUnique({
      where: { id: atendimentoId },
      include: { professional: true, paciente: true, plantao: true },
    });

    if (!atendimento) throw new Error("Atendimento não encontrado");
    return atendimento;
  }

  /**
   * Lista atendimentos de um paciente
   */
  async listByPatient(patientId: string) {
    return prisma.atendimento.findMany({
      where: { pacienteId: patientId },
      orderBy: { inicioPrevisto: "asc" },
    });
  }
}
