import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const pass = await bcrypt.hash("123456", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@neri.local" },
    update: {},
    create: {
      name: "Admin Neri",
      email: "admin@neri.local",
      password: pass,
      role: "ADMIN"
    }
  });

  const profUser = await prisma.user.create({
    data: {
      name: "Joao Prof",
      email: "joao@neri.local",
      password: pass,
      role: "PROFISSIONAL"
    }
  });

  await prisma.professional.create({
    data: {
      userId: profUser.id,
      cpf: "11122233344"
    }
  });

  const patientUser = await prisma.user.create({
    data: {
      name: "Maria Paciente",
      email: "maria@neri.local",
      password: pass,
      role: "PACIENTE"
    }
  });

  await prisma.patient.create({
    data: {
      userId: patientUser.id
    }
  });

  console.log("Seed finished");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
