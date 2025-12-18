import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtUser } from "../types/auth";

export interface AuthRequest extends Request {
  user?: JwtUser;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = verifyToken(token) as JwtUser;
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
