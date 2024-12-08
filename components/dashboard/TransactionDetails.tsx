import React from "react";
import { Transaction } from "@/components/dashboard/TransactionList";
import { TableHeader, TableCell } from "./TransactionShared";

interface TransactionProps {
  transactions: Transaction[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  }).format(date);
};

export const TransactionTable: React.FC<TransactionProps> = ({ transactions }) => {
  const isPositive = (type: string) => {
    return type === "TRANSFER_IN" || type === "DEPOSIT";
  };

  return (
    <div className="w-full">
      {/* Desktop version */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse bg-gray-300 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader>Date</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Balance</TableHeader>
              <TableHeader>Sender/Recipient IBAN</TableHeader>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-200">
                <TableCell>{formatDate(transaction.creationDate)}</TableCell>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {transaction.type?.replace("_", " ")}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isPositive(transaction.type) ? "text-green-600" : "text-red-600"}`}
                >
                  {isPositive(transaction.type) ? `+${transaction.amount}` : `-${transaction.amount}`}
                </td>
                <TableCell>{transaction.balance}</TableCell>
                <TableCell>{transaction?.relatedIBAN}</TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile version */}
      <div className="md:hidden space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="bg-white shadow rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">{formatDate(transaction.creationDate)}</span>
              <span
                className={`text-sm font-medium ${isPositive(transaction.type) ? "text-green-600" : "text-red-600"}`}
              >
                {isPositive(transaction.type) ? `+${transaction.amount}` : `-${transaction.amount}`}
              </span>
            </div>
            <div className="text-sm text-gray-500">{transaction?.relatedIBAN}</div>
            <div className="text-sm font-medium text-gray-900">{transaction.balance}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
