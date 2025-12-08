import { Request, Response } from "express";
import { AtendimentoService } from "../services/atendimento.service";

const service = new AtendimentoService();

export class AtendimentoController {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const at = await service.create(data);
      res.status(201).json(at);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async checkin(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { latitude, longitude, fotoUrl } = req.body;
      const result = await service.checkin(id, latitude, longitude, fotoUrl);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async checkout(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await service.checkout(id);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
