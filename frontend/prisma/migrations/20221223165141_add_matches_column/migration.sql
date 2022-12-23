/*
  Warnings:

  - Added the required column `matches` to the `Answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answers" ADD COLUMN     "matches" JSONB NOT NULL;
