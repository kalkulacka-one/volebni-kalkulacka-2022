/*
  Warnings:

  - You are about to drop the column `value` on the `Answers` table. All the data in the column will be lost.
  - Added the required column `answers` to the `Answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "value";
ALTER TABLE "Answers" ADD COLUMN     "answers" JSONB NOT NULL;
