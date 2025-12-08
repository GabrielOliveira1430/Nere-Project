import prisma from "../prismaClient";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt";

export class AuthService {
  async register(name: string, email: string, password: string, role = "PROFISSIONAL") {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) throw new Error("Email já cadastrado");

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hash, role }
    });

    return { id: user.id, email: user.email, role: user.role };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Usuário não encontrado");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Senha inválida");

    const token = signToken({ id: user.id, role: user.role, email: user.email });
    return { token };
  }
}
