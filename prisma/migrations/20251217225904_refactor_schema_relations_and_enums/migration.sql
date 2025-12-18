/*
  Warnings:

  - The `status` column on the `Atendimento` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `estado` column on the `Atividade` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Pagamento` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Plantao` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_LocalToPatient` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[plantaoId,professionalId]` on the table `Escala` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Atividade` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoAtividade" AS ENUM ('PENDENTE', 'EM_EXECUCAO', 'CONCLUIDA');

-- CreateEnum
CREATE TYPE "StatusAtendimento" AS ENUM ('PENDENTE', 'ALOCADO', 'EM_EXECUCAO', 'CONCLUIDO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "StatusPlantao" AS ENUM ('PENDENTE', 'CONFIRMADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "StatusPagamento" AS ENUM ('PENDENTE', 'PROCESSADO', 'PAGO', 'CANCELADO');

-- DropForeignKey
ALTER TABLE "Atividade" DROP CONSTRAINT "Atividade_atendimentoId_fkey";

-- DropForeignKey
ALTER TABLE "Atividade" DROP CONSTRAINT "Atividade_plantaoId_fkey";

-- DropForeignKey
ALTER TABLE "_LocalToPatient" DROP CONSTRAINT "_LocalToPatient_A_fkey";

-- DropForeignKey
ALTER TABLE "_LocalToPatient" DROP CONSTRAINT "_LocalToPatient_B_fkey";

-- AlterTable
ALTER TABLE "Atendimento" DROP COLUMN "status",
ADD COLUMN     "status" "StatusAtendimento" NOT NULL DEFAULT 'PENDENTE';

-- AlterTable
ALTER TABLE "Atividade" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoAtividade" NOT NULL DEFAULT 'PENDENTE';

-- AlterTable
ALTER TABLE "Pagamento" DROP COLUMN "status",
ADD COLUMN     "status" "StatusPagamento" NOT NULL DEFAULT 'PENDENTE';

-- AlterTable
ALTER TABLE "Plantao" DROP COLUMN "status",
ADD COLUMN     "status" "StatusPlantao" NOT NULL DEFAULT 'PENDENTE';

-- DropTable
DROP TABLE "_LocalToPatient";

-- CreateTable
CREATE TABLE "PatientLocal" (
    "patientId" TEXT NOT NULL,
    "localId" TEXT NOT NULL,

    CONSTRAINT "PatientLocal_pkey" PRIMARY KEY ("patientId","localId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Escala_plantaoId_professionalId_key" ON "Escala"("plantaoId", "professionalId");

-- AddForeignKey
ALTER TABLE "PatientLocal" ADD CONSTRAINT "PatientLocal_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientLocal" ADD CONSTRAINT "PatientLocal_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atividade" ADD CONSTRAINT "Atividade_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "Atendimento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atividade" ADD CONSTRAINT "Atividade_plantaoId_fkey" FOREIGN KEY ("plantaoId") REFERENCES "Plantao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
