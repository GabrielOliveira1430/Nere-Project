// src/controllers/atividade.controller.ts
import { Request, Response } from "express";
import { AtividadeService } from "../services/atividade.service";

const service = new AtividadeService();

export class AtividadeController {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const a = await service.create(data);
      res.status(201).json(a);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      const a = await service.updateStatus(id, estado);
      res.json(a);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async listByAtendimento(req: Request, res: Response) {
    try {
      const { atendimentoId } = req.params;
      const list = await service.listByAtendimento(atendimentoId);
      res.json(list);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
