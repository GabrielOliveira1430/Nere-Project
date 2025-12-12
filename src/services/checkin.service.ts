import prisma from "../prismaClient";

export class CheckinService {
  async create(data: {
    profissionalId: string;
    plantaoId: string;
    latitude?: number;
    longitude?: number;
    observacao?: string;
  }) {
    const {
      profissionalId,
      plantaoId,
      latitude,
      longitude,
      observacao,
    } = data;

    // ✅ Verifica vínculo via ESCALA
    const vinculo = await prisma.escala.findFirst({
      where: {
        professionalId: profissionalId,
        plantaoId: plantaoId,
      },
    });

    if (!vinculo) {
      throw new Error("Profissional não vinculado ao plantão");
    }

    // ✅ Verifica se já fez check-in
    const checkinExistente = await prisma.checkin.findFirst({
      where: {
        profissionalId,
        plantaoId,
      },
    });

    if (checkinExistente) {
      throw new Error("Check-in já realizado para este plantão");
    }

    return await prisma.checkin.create({
      data: {
        profissionalId,
        plantaoId,
        latitude,
        longitude,
        observacao,
      },
    });
  }

  async list() {
    return await prisma.checkin.findMany({
      include: {
        profissional: true,
        plantao: true,
      },
    });
  }

  async getById(id: string) {
    const checkin = await prisma.checkin.findUnique({
      where: { id },
      include: {
        profissional: true,
        plantao: true,
      },
    });

    if (!checkin) {
      throw new Error("Check-in não encontrado");
    }

    return checkin;
  }
}
