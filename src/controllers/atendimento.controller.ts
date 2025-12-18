import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { AtendimentoService } from "../services/atendimento.service";

const service = new AtendimentoService();

export class AtendimentoController {
  async create(req: AuthRequest, res: Response) {
    try {
      const result = await service.create(req.body);
      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async checkin(req: AuthRequest, res: Response) {
    try {
      if (!req.user) throw new Error("Usuário não autenticado");
      const { id } = req.params;
      const userId = String(req.user.id);
      const result = await service.checkin(id, userId);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async checkout(req: AuthRequest, res: Response) {
    try {
      if (!req.user) throw new Error("Usuário não autenticado");
      const { id } = req.params;
      const userId = String(req.user.id);
      const result = await service.checkout(id, userId);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      if (!req.user) throw new Error("Usuário não autenticado");
      const { id } = req.params;
      const userId = String(req.user.id);
      const userRole = req.user.role;
      const result = await service.update(id, userId, userRole, req.body);
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

  async listByPatient(req: AuthRequest, res: Response) {
    try {
      const { patientId } = req.params;
      const result = await service.listByPatient(patientId);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
