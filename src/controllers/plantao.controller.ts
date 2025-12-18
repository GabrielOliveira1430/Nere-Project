// src/controllers/PlantaoController.ts
import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { PlantaoService } from "../../src/services/plantao.service";
import { UserRole } from "@prisma/client";

const service = new PlantaoService();

export class PlantaoController {
  async create(req: AuthRequest, res: Response) {
    try {
      const result = await service.create(req.body);
      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      if (!req.user) throw new Error("Usuário não autenticado");
      const { id } = req.params;
      const result = await service.update(id, req.user.id, req.user.role, req.body);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async remove(req: AuthRequest, res: Response) {
    try {
      if (!req.user) throw new Error("Usuário não autenticado");
      const { id } = req.params;
      const result = await service.remove(id, req.user.id, req.user.role);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async getById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const result = await service.getById(id);
      return res.json(result);
    } catch (err: any) {
      return res.status(404).json({ message: err.message });
    }
  }

  async list(req: AuthRequest, res: Response) {
    try {
      const result = await service.list();
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
