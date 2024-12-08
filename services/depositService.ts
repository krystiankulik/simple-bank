import prisma from "@/utils/db";
import { Prisma } from "@prisma/client";

export async function depositToAccount(accountId: string, amount: number) {
  const account = await prisma.account.findUnique({
    where: { id: accountId },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return prisma.$transaction(async (prisma) => {
    const updatedAccount = await prisma.account.update({
      where: { id: accountId },
      data: {
        balance: {
          increment: new Prisma.Decimal(amount),
        },
      },
    });

    await prisma.transaction.create({
      data: {
        type: "DEPOSIT",
        accountId: accountId,
        balance: updatedAccount.balance,
        amount: amount,
      },
    });

    return updatedAccount;
  });
}
