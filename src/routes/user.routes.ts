import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const ctrl = new UserController();

router.get("/me", authMiddleware, (req, res) => ctrl.me(req, res));

export default router;
