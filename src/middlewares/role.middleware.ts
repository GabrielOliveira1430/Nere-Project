// src/middlewares/role.middleware.ts
import { NextFunction, Response } from "express";
import { AuthRequest } from "./auth.middleware";

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (!roles.includes(user.role)) return res.status(403).json({ message: "Forbidden" });
    next();
  };
}
