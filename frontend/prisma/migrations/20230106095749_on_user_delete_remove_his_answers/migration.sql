-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_userId_fkey";

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
