/*
  Warnings:

  - The `createdAt` column on the `Answers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `updatedAt` on the `Answers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "createdAt";
ALTER TABLE "Answers" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Answers" DROP COLUMN "updatedAt";
ALTER TABLE "Answers" ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL;
