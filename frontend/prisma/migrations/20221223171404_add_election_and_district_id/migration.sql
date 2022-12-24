/*
  Warnings:

  - Added the required column `districtId` to the `Answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electionId` to the `Answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answers" ADD COLUMN     "districtId" STRING NOT NULL;
ALTER TABLE "Answers" ADD COLUMN     "electionId" STRING NOT NULL;
