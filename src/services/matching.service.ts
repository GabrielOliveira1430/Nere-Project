// src/services/matching.service.ts
import prisma from "../prismaClient";

type Demanda = {
  tipo: string;
  inicio: Date;
  fim: Date;
  localLat?: number;
  localLon?: number;
  requisitos?: string[]; // ex: habilitacoes
};

export class MatchingService {
  // retorna top N profissionais candidatos com score
  async match(demanda: Demanda, top = 5) {
    // simplificação:
    // 1. buscar profissionais ativos
    // 2. calcular score por disponibilidade e score do profissional
    const pros = await prisma.professional.findMany({
      include: { user: true }
    });

    // placeholder: ordenar por score do profissional desc
    const results = pros
      .map(p => ({ professional: p, score: p.score || 0 }))
      .sort((a, b) => b.score - a.score)
      .slice(0, top);

    return results;
  }
}
