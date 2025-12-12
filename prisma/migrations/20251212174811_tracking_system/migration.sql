/*
  Warnings:

  - You are about to drop the column `fim` on the `Plantao` table. All the data in the column will be lost.
  - You are about to drop the column `inicio` on the `Plantao` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Plantao` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `Professional` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Professional` table. All the data in the column will be lost.
  - You are about to drop the column `crf` on the `Professional` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Professional` table. All the data in the column will be lost.
  - Added the required column `data` to the `Plantao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jornadaId` to the `Plantao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Plantao" DROP CONSTRAINT "Plantao_localId_fkey";

-- DropIndex
DROP INDEX "Professional_cpf_key";

-- AlterTable
ALTER TABLE "Plantao" DROP COLUMN "fim",
DROP COLUMN "inicio",
DROP COLUMN "nome",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "jornadaId" TEXT NOT NULL,
ADD COLUMN     "profissionalId" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDENTE',
ALTER COLUMN "localId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Professional" DROP COLUMN "cpf",
DROP COLUMN "createdAt",
DROP COLUMN "crf",
DROP COLUMN "score";

-- CreateTable
CREATE TABLE "Tracking" (
    "id" TEXT NOT NULL,
    "profissionalId" TEXT NOT NULL,
    "plantaoId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "speed" DOUBLE PRECISION,
    "bearing" DOUBLE PRECISION,
    "accuracy" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tracking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Plantao" ADD CONSTRAINT "Plantao_jornadaId_fkey" FOREIGN KEY ("jornadaId") REFERENCES "Jornada"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plantao" ADD CONSTRAINT "Plantao_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Professional"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plantao" ADD CONSTRAINT "Plantao_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tracking" ADD CONSTRAINT "Tracking_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tracking" ADD CONSTRAINT "Tracking_plantaoId_fkey" FOREIGN KEY ("plantaoId") REFERENCES "Plantao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
