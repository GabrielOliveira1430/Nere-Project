/*
  Warnings:

  - You are about to drop the column `dataHora` on the `Checkin` table. All the data in the column will be lost.
  - Made the column `latitude` on table `Checkin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `Checkin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Checkin" DROP COLUMN "dataHora",
ADD COLUMN     "checkinAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "checkoutAt" TIMESTAMP(3),
ADD COLUMN     "checkoutLatitude" DOUBLE PRECISION,
ADD COLUMN     "checkoutLongitude" DOUBLE PRECISION,
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "longitude" SET NOT NULL;
