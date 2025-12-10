// src/routes/index.ts
import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import professionalRoutes from "./professional.routes";
import regimeRoutes from "./regime.routes";
import jornadaRoutes from "./jornada.routes";
import plantaoRoutes from "./plantao.routes";
import escalaRoutes from "./escala.routes";
import atendimentoRoutes from "./atendimento.routes";
import atividadeRoutes from "./atividade.routes";
import pagamentoRoutes from "./pagamento.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/professionals", professionalRoutes);
router.use("/regimes", regimeRoutes);
router.use("/jornadas", jornadaRoutes);
router.use("/plantoes", plantaoRoutes);
router.use("/escalas", escalaRoutes);
router.use("/atendimentos", atendimentoRoutes);
router.use("/atividades", atividadeRoutes);
router.use("/pagamentos", pagamentoRoutes);

export default router;
