import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";

const router = Router();
const controller = new AuthController();

// ROTAS DE AUTENTICAÇÃO
router.post("/register", (req, res) => controller.register(req, res));
router.post("/login", (req, res) => controller.login(req, res));

// 🔥 ROTA PARA TESTAR TOKEN
router.get("/me", authMiddleware, (req: AuthRequest, res) => {
  return res.json({
    message: "Token válido!",
    user: req.user, // agora não dá erro ✔
  });
});

export default router;
