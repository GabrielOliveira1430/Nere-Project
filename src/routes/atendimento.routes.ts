import { Router } from "express";
import { AtendimentoController } from "../controllers/atendimento.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ensureRole } from "../middlewares/ensureRole.middleware";
import { UserRole } from "@prisma/client";

const router = Router();
const ctrl = new AtendimentoController();

/**
 * Criar atendimento
 * - PROFISSIONAL e ADMIN podem criar
 */
router.post(
  "/",
  authMiddleware,
  ensureRole(UserRole.PROFISSIONAL, UserRole.ADMIN),
  (req, res) => ctrl.create(req, res)
);

/**
 * Check-in do atendimento
 * - Somente PROFISSIONAL responsável pode fazer
 */
router.post(
  "/:id/checkin",
  authMiddleware,
  ensureRole(UserRole.PROFISSIONAL),
  (req, res) => ctrl.checkin(req, res)
);

/**
 * Check-out do atendimento
 * - Somente PROFISSIONAL responsável pode fazer
 */
router.post(
  "/:id/checkout",
  authMiddleware,
  ensureRole(UserRole.PROFISSIONAL),
  (req, res) => ctrl.checkout(req, res)
);

/**
 * Atualizar atendimento
 * - PROFISSIONAL responsável ou ADMIN
 */
router.put(
  "/:id",
  authMiddleware,
  ensureRole(UserRole.PROFISSIONAL, UserRole.ADMIN),
  (req, res) => ctrl.update(req, res)
);

/**
 * Obter atendimento por ID
 * - PROFISSIONAL responsável ou ADMIN
 */
router.get(
  "/:id",
  authMiddleware,
  ensureRole(UserRole.PROFISSIONAL, UserRole.ADMIN),
  (req, res) => ctrl.getById(req, res)
);

/**
 * Listar atendimentos de um paciente
 * - PROFISSIONAL ou ADMIN
 */
router.get(
  "/patient/:patientId",
  authMiddleware,
  ensureRole(UserRole.PROFISSIONAL, UserRole.ADMIN),
  (req, res) => ctrl.listByPatient(req, res)
);

export default router;
