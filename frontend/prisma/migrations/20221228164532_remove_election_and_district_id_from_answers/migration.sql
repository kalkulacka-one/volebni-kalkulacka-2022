/*
  Warnings:

  - You are about to drop the column `districtId` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `electionId` on the `Answers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "districtId";
ALTER TABLE "Answers" DROP COLUMN "electionId";
