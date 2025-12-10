// src/controllers/professional.controller.ts
import { Request, Response } from "express";
import { ProfessionalService } from "../services/professional.service";

const service = new ProfessionalService();

export class ProfessionalController {
  async create(req: Request, res: Response) {
    try {
      const { userId, cpf, crf } = req.body;
      const prof = await service.create(userId, cpf, crf);
      res.status(201).json(prof);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const prof = await service.getById(id);
      if (!prof) return res.status(404).json({ message: "Profissional não encontrado" });
      res.json(prof);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const filters = req.query as any;
      const list = await service.list(filters);
      res.json(list);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await service.update(id, data);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
