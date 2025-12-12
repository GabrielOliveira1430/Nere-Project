import { Router } from "express";
import { CheckinController } from "../controllers/checkin.controller";

const router = Router();
const controller = new CheckinController();

// Criar check-in
router.post("/", (req, res) => controller.create(req, res));

// Listar todos
router.get("/", (req, res) => controller.list(req, res));

// Buscar por ID
router.get("/:id", (req, res) => controller.getById(req, res));

// Registrar check-out
router.post("/:id/checkout", (req, res) => controller.checkout(req, res));

export default router;
