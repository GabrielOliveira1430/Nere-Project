// src/routes/atividade.routes.ts
import { Router } from "express";
import { AtividadeController } from "../controllers/atividade.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();
const ctrl = new AtividadeController();

router.post("/", authMiddleware, requireRole("ADMIN", "GESTOR", "PROFISSIONAL"), (req, res) => ctrl.create(req, res));
router.put("/:id/status", authMiddleware, requireRole("ADMIN", "GESTOR", "PROFISSIONAL"), (req, res) => ctrl.updateStatus(req, res));
router.get("/atendimento/:atendimentoId", authMiddleware, (req, res) => ctrl.listByAtendimento(req, res));

export default router;
