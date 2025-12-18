// src/services/AtividadeService.ts
import prisma from "../prismaClient";
import { EstadoAtividade, StatusAtendimento } from "@prisma/client";

interface CreateAtividadeDTO {
  tipo: string;
  atendimentoId?: string;
  plantaoId?: string;
}

export class AtividadeService {
  async create(data: CreateAtividadeDTO) {
    const { atendimentoId, plantaoId } = data;
    if (!atendimentoId && !plantaoId)
      throw new Error("Atividade precisa de atendimento ou plantão");
    if (atendimentoId && plantaoId)
      throw new Error("Não pode vincular a atendimento e plantão ao mesmo tempo");

    if (atendimentoId) {
      const atendimento = await prisma.atendimento.findUnique({ where: { id: atendimentoId } });
      if (!atendimento) throw new Error("Atendimento não encontrado");
      if (atendimento.status === StatusAtendimento.CONCLUIDO)
        throw new Error("Não é possível criar atividade em atendimento concluído");
    }

    return prisma.atividade.create({
      data: { ...data, estado: EstadoAtividade.PENDENTE },
    });
  }

  async updateStatus(id: string, novoEstado: EstadoAtividade) {
    const atividade = await prisma.atividade.findUnique({
      where: { id },
      include: { atendimento: true },
    });
    if (!atividade) throw new Error("Atividade não encontrada");

    if (
      atividade.atendimento &&
      atividade.atendimento.status === StatusAtendimento.CONCLUIDO
    ) {
      throw new Error("Não é possível alterar atividade de atendimento concluído");
    }

    const transicoes: Record<EstadoAtividade, EstadoAtividade[]> = {
      PENDENTE: [EstadoAtividade.EM_EXECUCAO],
      EM_EXECUCAO: [EstadoAtividade.CONCLUIDA],
      CONCLUIDA: [],
    };

    if (!transicoes[atividade.estado].includes(novoEstado)) {
      throw new Error(`Transição inválida de ${atividade.estado} para ${novoEstado}`);
    }

    return prisma.atividade.update({ where: { id }, data: { estado: novoEstado } });
  }

  async listByAtendimento(atendimentoId: string) {
    return prisma.atividade.findMany({
      where: { atendimentoId },
      orderBy: { createdAt: "asc" },
    });
  }
}
