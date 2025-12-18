import prisma from "../prismaClient";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt";
import { UserRole } from "@prisma/client";

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export class AuthService {

  //////////////////////
  // REGISTER
  //////////////////////
  async register(data: RegisterDTO) {
    const { name, email, password, role } = data;

    // 1️⃣ Email único
    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      throw new Error("Email já cadastrado");
    }

    // 2️⃣ Validação de senha
    if (password.length < 6) {
      throw new Error("Senha deve ter no mínimo 6 caracteres");
    }

    // 3️⃣ Roles permitidas via cadastro público
    const allowedRoles: UserRole[] = [
      UserRole.PROFISSIONAL,
      UserRole.PACIENTE,
    ];

    if (role === UserRole.ADMIN) {
      throw new Error("Não é permitido criar ADMIN via cadastro público");
    }

    const userRole =
      role && allowedRoles.includes(role)
        ? role
        : UserRole.PROFISSIONAL;

    // 4️⃣ Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Transação (atomicidade)
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: userRole,
        },
      });

      // Criação automática da entidade vinculada
      if (userRole === UserRole.PROFISSIONAL) {
        await tx.professional.create({
          data: {
            userId: user.id,
          },
        });
      }

      if (userRole === UserRole.PACIENTE) {
        await tx.patient.create({
          data: {
            userId: user.id,
          },
        });
      }

      return {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      };
    });

    return result;
  }

  //////////////////////
  // LOGIN
  //////////////////////
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Mensagem genérica
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Credenciais inválidas");
    }

    const token = signToken({
      id: user.id,
      role: user.role,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
