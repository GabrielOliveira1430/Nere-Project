// src/routes/pagamento.routes.ts
import { Router } from "express";
import { PagamentoController } from "../controllers/pagamento.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();
const ctrl = new PagamentoController();

router.post("/", authMiddleware, requireRole("ADMIN", "FINANCEIRO"), (req, res) => ctrl.create(req, res));
router.get("/:id", authMiddleware, requireRole("ADMIN", "FINANCEIRO"), (req, res) => ctrl.get(req, res));
router.put("/:id/status", authMiddleware, requireRole("ADMIN", "FINANCEIRO"), (req, res) => ctrl.updateStatus(req, res));

export default router;
