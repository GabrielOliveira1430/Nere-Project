// src/controllers/regime.controller.ts
import { Request, Response } from "express";
import { RegimeService } from "../services/regime.service";

const service = new RegimeService();

export class RegimeController {
  async create(req: Request, res: Response) {
    try {
      const body = req.body;
      const r = await service.create(body);
      res.status(201).json(r);
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

  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const r = await service.get(id);
      if (!r) return res.status(404).json({ message: "Regime não encontrado" });
      res.json(r);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const r = await service.update(id, data);
      res.json(r);
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
