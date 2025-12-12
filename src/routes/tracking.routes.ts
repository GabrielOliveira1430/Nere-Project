import { Router } from "express";
import { TrackingController } from "../controllers/tracking.controller";

const router = Router();
const controller = new TrackingController();

// Registrar localização em tempo real
router.post("/", (req, res) => controller.track(req, res));

// Histórico por profissional
router.get("/professional/:profissionalId", (req, res) =>
  controller.listByProfessional(req, res)
);

// Histórico por plantão
router.get("/plantao/:plantaoId", (req, res) =>
  controller.listByPlantao(req, res)
);

export default router;
