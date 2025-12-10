// src/controllers/jornada.controller.ts
import { Request, Response } from "express";
import { JornadaService } from "../services/jornada.service";

const service = new JornadaService();

export class JornadaController {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const j = await service.create(data);
      res.status(201).json(j);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async listByProfessional(req: Request, res: Response) {
    try {
      const { professionalId } = req.params;
      const list = await service.listByProfessional(professionalId);
      res.json(list);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const j = await service.update(id, data);
      res.json(j);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await service.remove(id);
      res.json({ message: "Removido" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
