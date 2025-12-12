import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "../src/routes"; // ✅ import centralizado
import { errorHandler } from "../src/middlewares/error.middleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ todas as rotas agora passam por /api
app.use("/api", routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
