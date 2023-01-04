import { prisma } from './prisma';

export interface AnswerToUserArgs {
  answerId: string;
  updateToken: string;
  userId: string;
}

export async function assignAnswerToUser({
  answerId,
  updateToken,
  userId,
}: AnswerToUserArgs) {
  try {
    const { updateToken: dbUpdateToken } =
      await prisma.answers.findUniqueOrThrow({
        where: { id: answerId },
        select: { updateToken: true },
      });
    if (updateToken === dbUpdateToken) {
      await prisma.answers.update({
        where: { id: answerId },
        data: { userId: userId },
      });
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}
