-- CreateEnum
CREATE TYPE "AnswersSource" AS ENUM ('web', 'embed');

-- CreateTable
CREATE TABLE "Answers" (
    "id" STRING NOT NULL,
    "updateToken" STRING NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "source" "AnswersSource" NOT NULL DEFAULT 'web',
    "embedName" STRING,
    "calculatorId" STRING NOT NULL,
    "answers" JSONB NOT NULL,
    "matches" JSONB NOT NULL,
    "userId" STRING,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "displayName" STRING(255),
    "email" STRING(255),
    "authProvider" STRING(32),
    "authProviderId" STRING(255),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Answers_userId_idx" ON "Answers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_authProviderId_key" ON "User"("authProviderId");

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
