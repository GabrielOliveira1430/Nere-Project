import prisma from "../prismaClient";

export class UserService {
  async getById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) {
    return prisma.user.create({
      data: {
        ...data,
        role: data.role ?? "PACIENTE", // ✅ valor padrão
      },
    });
  }
}
