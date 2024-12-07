import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { Prisma } from "@prisma/client";
import { IBAN } from "ibankit";

async function validateIBAN(iban: string): Promise<boolean> {
  return IBAN.isValid(iban);
}

export async function POST(req: Request) {
  const { accountId, amount, transferRecipientIBAN } = await req.json();

  if (!accountId || !amount || amount <= 0 || !transferRecipientIBAN) {
    return NextResponse.json({ message: "Invalid request parameters" }, { status: 400 });
  }

  if (!(await validateIBAN(transferRecipientIBAN))) {
    return NextResponse.json({ message: "Invalid IBAN" }, { status: 400 });
  }

  try {
    const senderAccount = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!senderAccount) {
      return NextResponse.json({ message: "Sender account not found" }, { status: 404 });
    }

    if (senderAccount.balance.lessThan(amount)) {
      return NextResponse.json({ message: "Insufficient funds" }, { status: 400 });
    }

    const recipientAccount = await prisma.account.findUnique({
      where: { IBAN: transferRecipientIBAN },
    });

    const transactionMessage = recipientAccount
      ? "Money transferred internally"
      : "Money transferred outside of the bank";

    const updatedSenderAccount = await prisma.$transaction(async (prisma) => {
      const updatedSenderAccount = await prisma.account.update({
        where: { id: accountId },
        data: {
          balance: {
            decrement: new Prisma.Decimal(amount),
          },
        },
      });

      if (recipientAccount) {
        await prisma.account.update({
          where: { id: recipientAccount.id },
          data: {
            balance: {
              increment: new Prisma.Decimal(amount),
            },
          },
        });
      }

      await prisma.transaction.create({
        data: {
          type: "TRANSFER",
          accountId: senderAccount.id,
          transferRecipientIBAN,
          balance: senderAccount.balance,
          amount: amount,
        },
      });

      return updatedSenderAccount;
    });

    return NextResponse.json(
      {
        balance: updatedSenderAccount.balance.toNumber().toFixed(2),
        message: transactionMessage,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
