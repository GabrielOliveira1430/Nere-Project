import { Request, Response } from "express";
import { TrackingService } from "../services/tracking.service";

const service = new TrackingService();

export class TrackingController {
  async track(req: Request, res: Response) {
    try {
      const {
        profissionalId,
        plantaoId,
        latitude,
        longitude,
        speed,
        bearing,
        accuracy,
      } = req.body;

      if (!profissionalId || !plantaoId || !latitude || !longitude) {
        return res.status(400).json({ error: "Dados incompletos." });
      }

      const saved = await service.create({
        profissionalId,
        plantaoId,
        latitude,
        longitude,
        speed,
        bearing,
        accuracy,
      });

      return res.status(201).json(saved);

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao registrar localização." });
    }
  }

  async listByProfessional(req: Request, res: Response) {
    try {
      const { profissionalId } = req.params;

      const history = await service.listByProfessional(profissionalId);

      return res.json(history);

    } catch (err) {
      return res.status(500).json({ error: "Erro ao buscar histórico." });
    }
  }

  async listByPlantao(req: Request, res: Response) {
    try {
      const { plantaoId } = req.params;

      const history = await service.listByPlantao(plantaoId);

      return res.json(history);

    } catch (err) {
      return res.status(500).json({ error: "Erro ao buscar histórico." });
    }
  }
}
