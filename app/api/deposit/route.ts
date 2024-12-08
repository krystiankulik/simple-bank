import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const { accountId, amount } = await req.json();

  if (!accountId || !amount || amount <= 0) {
    return NextResponse.json({ message: "Invalid account or withdraw amount" }, { status: 400 });
  }

  try {
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      return NextResponse.json({ message: "Account not found" }, { status: 404 });
    }

    const updatedAccount = await prisma.$transaction(async (prisma) => {
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

    return NextResponse.json(
      {
        balance: updatedAccount.balance.toNumber().toFixed(2),
        message: "Deposit successful",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}