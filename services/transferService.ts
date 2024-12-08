import prisma from "@/utils/db";
import { Prisma } from "@prisma/client";
import { IBAN } from "ibankit";

export async function validateIBAN(iban: string): Promise<boolean> {
  return IBAN.isValid(iban);
}

export async function transferBetweenAccounts(fromAccountId: string, toIBAN: string, amount: number) {
  const parsedIBAN = new IBAN(toIBAN).toString();

  const senderAccount = await prisma.account.findUnique({
    where: { id: fromAccountId },
  });

  if (!senderAccount) {
    throw new Error("Sender account not found");
  }

  if (senderAccount.balance.lessThan(amount)) {
    throw new Error("Insufficient funds");
  }

  const recipientAccount = await prisma.account.findUnique({
    where: { IBAN: parsedIBAN },
  });

  const transactionMessage = recipientAccount
    ? "Money transferred internally"
    : "Money transferred outside of the bank";

  const updatedSenderAccount = await prisma.$transaction(async (prisma) => {
    const updatedSenderAccount = await prisma.account.update({
      where: { id: fromAccountId },
      data: {
        balance: {
          decrement: new Prisma.Decimal(amount),
        },
      },
    });

    if (recipientAccount) {
      const updatedRecipientAccount = await prisma.account.update({
        where: { id: recipientAccount.id },
        data: {
          balance: {
            increment: new Prisma.Decimal(amount),
          },
        },
      });

      await prisma.transaction.create({
        data: {
          type: "TRANSFER_IN",
          accountId: updatedRecipientAccount.id,
          relatedIBAN: senderAccount.IBAN,
          balance: updatedRecipientAccount.balance,
          amount: amount,
        },
      });
    }

    await prisma.transaction.create({
      data: {
        type: "TRANSFER_OUT",
        accountId: updatedSenderAccount.id,
        relatedIBAN: parsedIBAN,
        balance: updatedSenderAccount.balance,
        amount: amount,
      },
    });

    return updatedSenderAccount;
  });

  return {
    updatedSenderAccount,
    transactionMessage,
  };
}
