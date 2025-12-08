import { Router } from "express";
import { AtendimentoController } from "../controllers/atendimento.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const ctrl = new AtendimentoController();

router.post("/", authMiddleware, (req, res) => ctrl.create(req, res));
router.post("/:id/checkin", authMiddleware, (req, res) => ctrl.checkin(req, res));
router.post("/:id/checkout", authMiddleware, (req, res) => ctrl.checkout(req, res));

export default router;
