// src/controllers/escala.controller.ts
import { Request, Response } from "express";
import { EscalaService } from "../services/escala.service";

const service = new EscalaService();

export class EscalaController {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const e = await service.create(data);
      res.status(201).json(e);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async listByPlantao(req: Request, res: Response) {
    try {
      const { plantaoId } = req.params;
      const list = await service.listByPlantao(plantaoId);
      res.json(list);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await service.remove(id);
      res.json({ message: "Removida" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
