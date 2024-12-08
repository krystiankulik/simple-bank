import React from "react";
import { Transaction } from "@/components/dashboard/TransactionList";

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
    <div className="grid grid-cols-5 gap-4 p-4 border rounded-md">
      <div className="font-bold">Date</div>
      <div className="font-bold">Type</div>
      <div className="font-bold">Amount</div>
      <div className="font-bold">Balance</div>
      <div className="font-bold">Sender/Recipient IBAN</div>

      {transactions.map((transaction) => (
        <React.Fragment key={transaction.id}>
          <div>{formatDate(transaction.creationDate)}</div>
          <div>{transaction.type?.replace("_", " ")}</div>
          <div className={isPositive(transaction.type) ? "text-green-500" : "text-red-500"}>
            {isPositive(transaction.type) ? `+${transaction.amount}` : `-${transaction.amount}`}
          </div>
          <div>{transaction.balance}</div>
          <div>{transaction?.relatedIBAN}</div>
        </React.Fragment>
      ))}
    </div>
  );
};
