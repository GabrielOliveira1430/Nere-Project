// src/controllers/plantao.controller.ts
import { Request, Response } from "express";
import { PlantaoService } from "../services/plantao.service";

const service = new PlantaoService();

export class PlantaoController {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const p = await service.create(data);
      res.status(201).json(p);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const p = await service.get(id);
      if (!p) return res.status(404).json({ message: "Plantão não encontrado" });
      res.json(p);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const list = await service.list();
      res.json(list);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const p = await service.update(id, data);
      res.json(p);
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
