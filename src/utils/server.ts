import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "../routes/auth.routes";
import userRoutes from "../routes/user.routes";
import atendimentoRoutes from "../routes/atendimento.routes";
import { errorHandler } from "../middlewares/error.middleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/atendimentos", atendimentoRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
