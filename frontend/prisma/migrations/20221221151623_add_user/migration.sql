-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "userId" STRING;

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING(255),
    "email" STRING(255) NOT NULL,
    "authProvider" STRING(32),
    "authProviderId" STRING(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
