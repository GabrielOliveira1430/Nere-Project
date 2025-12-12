import prisma from "../prismaClient";

type Demanda = {
  tipo: string;
  inicio: Date;
  fim: Date;
  localLat?: number;
  localLon?: number;
  requisitos?: string[];
};

type MatchResult = {
  professional: any;
  score: number;
};

export class MatchingService {
  async match(demanda: Demanda, top = 5) {
    const pros = await prisma.professional.findMany({
      include: { user: true },
    });

    const results: MatchResult[] = pros
      .map((p: any) => ({
        professional: p,
        score: (p.score ?? 0) || 0, // garante number
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, top);

    return results;
  }
}
