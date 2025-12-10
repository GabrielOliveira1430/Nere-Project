// src/routes/jornada.routes.ts
import { Router } from "express";
import { JornadaController } from "../controllers/jornada.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();
const ctrl = new JornadaController();

router.post("/", authMiddleware, requireRole("ADMIN", "GESTOR"), (req, res) => ctrl.create(req, res));
router.get("/professional/:professionalId", authMiddleware, (req, res) => ctrl.listByProfessional(req, res));
router.put("/:id", authMiddleware, requireRole("ADMIN", "GESTOR"), (req, res) => ctrl.update(req, res));
router.delete("/:id", authMiddleware, requireRole("ADMIN", "GESTOR"), (req, res) => ctrl.remove(req, res));

export default router;
