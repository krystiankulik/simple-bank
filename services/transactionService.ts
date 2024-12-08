import prisma from "@/utils/db";
import { IBAN } from "ibankit";

export async function getTransactions(accountId: string, page: number, limit: number) {
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

  return {
    transactions: transactions.map((txn) => ({
      id: txn.id,
      type: txn.type,
      relatedIBAN: IBAN.printFormat(txn.relatedIBAN ?? "", " "),
      creationDate: txn.creationDate,
      balance: txn.balance.toNumber().toFixed(2),
      amount: txn.amount.toNumber().toFixed(2),
    })),
    totalCount,
  };
}
