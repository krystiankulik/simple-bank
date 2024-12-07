import { NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function GET(_: Request, { params }: { params: { accountId: string } }) {
  const { accountId } = params;

  if (!accountId) {
    return NextResponse.json({ message: "Account ID is required" }, { status: 400 });
  }

  try {
    const account = await prisma.account.findUnique({
      where: { id: accountId },
      include: {
        transactions: {
          orderBy: { creationDate: "desc" },
        },
      },
    });

    if (!account) {
      return NextResponse.json({ message: "Account not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        balance: account.balance.toNumber().toFixed(2),
        transactions: account.transactions.map((txn) => ({
          id: txn.id,
          type: txn.type,
          transferRecipientIBAN: txn.transferRecipientIBAN,
          creationDate: txn.creationDate,
          balance: txn.balance.toNumber().toFixed(2),
          amount: txn.amount.toNumber().toFixed(2),
        })),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
