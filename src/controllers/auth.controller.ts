import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserRole } from "@prisma/client";

const authService = new AuthService();

export class AuthController {

  async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;

      const user = await authService.register({
        name,
        email,
        password,
        role: role as UserRole, // cast controlado (validação real fica no service)
      });

      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(400).json({
        message: err.message ?? "Erro ao registrar usuário",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(401).json({
        message: err.message ?? "Credenciais inválidas",
      });
    }
  }
}
