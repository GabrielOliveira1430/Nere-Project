import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CheckinController {
  // Criar Check-in
  async create(req: Request, res: Response) {
    try {
      const {
        profissionalId,
        plantaoId,
        latitude,
        longitude,
        observacao,
      } = req.body;

      const checkin = await prisma.checkin.create({
        data: {
          profissionalId,
          plantaoId,
          latitude,
          longitude,
          observacao,
        },
      });

      return res.status(201).json(checkin);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao registrar check-in." });
    }
  }

  // Listar Check-ins
  async list(req: Request, res: Response) {
  try {
    const checkins = await prisma.checkin.findMany({
      orderBy: { checkinAt: "desc" },
    });

    return res.json(checkins);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
  // Buscar por ID
  async getById(req: Request, res: Response) {
    try {
      const checkin = await prisma.checkin.findUnique({
        where: { id: req.params.id },
      });

      if (!checkin) {
        return res.status(404).json({ error: "Check-in não encontrado." });
      }

      return res.json(checkin);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar check-in." });
    }
  }

  // Registrar CHECK-OUT
  async checkout(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { latitude, longitude } = req.body;

      // Verifica se existe
      const existing = await prisma.checkin.findUnique({ where: { id } });
      if (!existing) {
        return res.status(404).json({ error: "Check-in não encontrado." });
      }

      if (existing.checkoutAt) {
        return res.status(400).json({ error: "Check-out já registrado." });
      }

      // Atualiza com checkout
      const updated = await prisma.checkin.update({
        where: { id },
        data: {
          checkoutAt: new Date(),
          checkoutLatitude: latitude,
          checkoutLongitude: longitude,
        },
      });

      return res.json({
        message: "Check-out registrado com sucesso!",
        data: updated,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao fazer check-out." });
    }
  }
}
