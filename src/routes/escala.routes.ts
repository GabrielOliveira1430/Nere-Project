// src/routes/escala.routes.ts
import { Router } from "express";
import { EscalaController } from "../controllers/escala.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();
const ctrl = new EscalaController();

router.post("/", authMiddleware, requireRole("ADMIN", "GESTOR"), (req, res) => ctrl.create(req, res));
router.get("/plantao/:plantaoId", authMiddleware, (req, res) => ctrl.listByPlantao(req, res));
router.delete("/:id", authMiddleware, requireRole("ADMIN", "GESTOR"), (req, res) => ctrl.remove(req, res));

export default router;

