-- CreateEnum
CREATE TYPE "AnswersSource" AS ENUM ('web', 'embed');

-- CreateTable
CREATE TABLE "Answers" (
    "id" STRING NOT NULL,
    "updateToken" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "source" "AnswersSource" NOT NULL DEFAULT 'web',
    "embedName" STRING,
    "calculatorId" STRING NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);
