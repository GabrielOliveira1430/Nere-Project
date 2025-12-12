import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Todas as rotas com /api
app.use("/api", routes);

app.use(errorHandler);

export default app;
