import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";

const router = Router();
const controller = new AuthController();

//////////////////////
// ROTAS PÚBLICAS
//////////////////////

router.post("/register", controller.register);
router.post("/login", controller.login);

//////////////////////
// ROTAS PROTEGIDAS
//////////////////////

// 🔥 TESTE DE AUTENTICAÇÃO
router.get("/me", authMiddleware, (req: AuthRequest, res) => {
  return res.status(200).json({
    message: "Token válido",
    user: req.user,
  });
});

export default router;
