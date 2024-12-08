import { TransactionDate } from "@/components/dashboard/transactions/TransactionDate";
import { TransactionAmount } from "@/components/dashboard/transactions/TransactionAmount";
import React from "react";
import { Transaction } from "@/components/dashboard/transactions/TransactionInfiniteScroll";

interface TransactionListDesktopProps {
  transactions: Transaction[];
}

const TableHeader: React.FC<React.PropsWithChildren> = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">{children}</th>
);

const TableCell: React.FC<React.PropsWithChildren> = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{children}</td>
);

export const TransactionListDesktop = ({ transactions }: TransactionListDesktopProps) => {
  return (
    <table className="w-full border-collapse bg-base-100 shadow-sm rounded-lg">
      <thead className="bg-neutral">
        <tr>
          <TableHeader>Date</TableHeader>
          <TableHeader>Type</TableHeader>
          <TableHeader>Amount</TableHeader>
          <TableHeader>Balance</TableHeader>
          <TableHeader>Sender/Recipient IBAN</TableHeader>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-300">
        {transactions.map((transaction) => (
          <tr key={transaction.id} className="hover:bg-base-200 transition-colors duration-200">
            <TableCell>
              <TransactionDate date={transaction.creationDate} />
            </TableCell>
            <TableCell>{transaction.type?.replace("_", " ")}</TableCell>
            <TableCell>
              <TransactionAmount type={transaction.type} amount={transaction.amount} />
            </TableCell>
            <TableCell>{transaction.balance}</TableCell>
            <TableCell>{transaction?.relatedIBAN}</TableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
