import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { IBAN } from "ibankit";

export async function GET(request: NextRequest, { params }: { params: Promise<{ accountId: string }> }) {
  const accountId = (await params).accountId;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!accountId) {
    return NextResponse.json({ message: "Account ID is required" }, { status: 400 });
  }

  try {
    const account = await prisma.account.findUnique({
      where: { id: accountId },
      select: { balance: true },
    });

    if (!account) {
      return NextResponse.json({ message: "Account not found" }, { status: 404 });
    }

    const skip = (page - 1) * limit;

    const [transactions, totalCount] = await Promise.all([
      prisma.transaction.findMany({
        where: { accountId },
        orderBy: { creationDate: "desc" },
        skip,
        take: limit,
      }),
      prisma.transaction.count({ where: { accountId } }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      {
        balance: account.balance.toNumber().toFixed(2),
        transactions: transactions.map((txn) => ({
          id: txn.id,
          type: txn.type,
          relatedIBAN: IBAN.printFormat(txn.relatedIBAN ?? "", " "),
          creationDate: txn.creationDate,
          balance: txn.balance.toNumber().toFixed(2),
          amount: txn.amount.toNumber().toFixed(2),
        })),
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage: page < totalPages,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
