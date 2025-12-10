// src/routes/plantao.routes.ts
import { Router } from "express";
import { PlantaoController } from "../controllers/plantao.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();
const ctrl = new PlantaoController();

router.post("/", authMiddleware, requireRole("ADMIN", "GESTOR"), (req, res) => ctrl.create(req, res));
router.get("/", authMiddleware, (req, res) => ctrl.list(req, res));
router.get("/:id", authMiddleware, (req, res) => ctrl.get(req, res));
router.put("/:id", authMiddleware, requireRole("ADMIN", "GESTOR"), (req, res) => ctrl.update(req, res));
router.delete("/:id", authMiddleware, requireRole("ADMIN", "GESTOR"), (req, res) => ctrl.remove(req, res));

export default router;
