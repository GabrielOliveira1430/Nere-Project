import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { UserRole } from "@prisma/client";

/**
 * Middleware para controle de acesso por role
 * @param roles Roles permitidas para acessar a rota
 */
export function ensureRole(...roles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    // 1️⃣ Usuário precisa estar autenticado
    if (!req.user) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }

    // 2️⃣ Role precisa existir
    const userRole = req.user.role as UserRole;

    if (!userRole) {
      return res.status(403).json({
        message: "Role do usuário não encontrada",
      });
    }

    // 3️⃣ Verifica se a role está autorizada
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: "Acesso negado para este perfil",
      });
    }

    // 4️⃣ Tudo certo
    return next();
  };
}
