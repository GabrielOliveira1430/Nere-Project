// src/controllers/AtividadeController.ts
import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { AtividadeService } from "../../src/services/atividade.service";
import { EstadoAtividade } from "@prisma/client";

const service = new AtividadeService();

export class AtividadeController {
  async create(req: AuthRequest, res: Response) {
    try {
      const result = await service.create(req.body);
      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async updateStatus(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { novoEstado } = req.body;
      if (!Object.values(EstadoAtividade).includes(novoEstado)) {
        throw new Error("Estado inválido");
      }
      const result = await service.updateStatus(id, novoEstado);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async listByAtendimento(req: AuthRequest, res: Response) {
    try {
      const { atendimentoId } = req.params;
      const result = await service.listByAtendimento(atendimentoId);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
