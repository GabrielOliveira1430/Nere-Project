// src/controllers/pagamento.controller.ts
import { Request, Response } from "express";
import { PagamentoService } from "../services/pagamento.service";

const service = new PagamentoService();

export class PagamentoController {
  async create(req: Request, res: Response) {
    try {
      const { atendimentoId, valorBruto } = req.body;
      const p = await service.createForAtendimento(atendimentoId, Number(valorBruto));
      res.status(201).json(p);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const p = await service.get(id);
      if (!p) return res.status(404).json({ message: "Pagamento não encontrado" });
      res.json(p);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const p = await service.setStatus(id, status);
      res.json(p);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
