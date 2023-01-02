-- AlterTable
ALTER TABLE "Answers" ADD COLUMN     "userId" STRING;

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING(255),
    "email" STRING(255) NOT NULL,
    "authProvider" STRING(32),
    "authProviderId" STRING(255),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
