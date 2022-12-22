/*
  Warnings:

  - Added the required column `updatedAt` to the `Answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answers" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
