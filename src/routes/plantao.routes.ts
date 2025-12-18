import { Router } from "express";
import { PlantaoController } from "../controllers/plantao.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ensureRole } from "../middlewares/ensureRole.middleware";
import { UserRole } from "@prisma/client";

const router = Router();
const ctrl = new PlantaoController();

router.post(
  "/",
  authMiddleware,
  ensureRole(UserRole.ADMIN),
  (req, res) => ctrl.create(req, res)
);

router.get(
  "/",
  authMiddleware,
  ensureRole(UserRole.ADMIN, UserRole.PROFISSIONAL),
  (req, res) => ctrl.list(req, res)
);

router.get(
  "/:id",
  authMiddleware,
  ensureRole(UserRole.ADMIN, UserRole.PROFISSIONAL),
  (req, res) => ctrl.getById(req, res)
);

router.delete(
  "/:id",
  authMiddleware,
  ensureRole(UserRole.ADMIN),
  (req, res) => ctrl.remove(req, res)
);

export default router;
