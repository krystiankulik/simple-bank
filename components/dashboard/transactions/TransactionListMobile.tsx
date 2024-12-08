import { TransactionDate } from "@/components/dashboard/transactions/TransactionDate";
import { TransactionAmount } from "@/components/dashboard/transactions/TransactionAmount";
import React from "react";
import { Transaction } from "@/components/dashboard/transactions/TransactionInfiniteScroll";

interface TransactionListMobileProps {
  transactions: Transaction[];
}

export const TransactionListMobile: React.FC<TransactionListMobileProps> = ({ transactions }) => {
  const renderIBAN = (transaction: Transaction) => {
    return transaction.relatedIBAN ? (
      <div className="text-sm text-gray-400 flex flex-col sm:flex-row">
        <div className={"mr-2"}>{transaction.type === "TRANSFER_IN" ? "Sender IBAN: " : "Recipient IBAN: "}</div>
        <div className="font-medium text-gray-300">{transaction.relatedIBAN}</div>
      </div>
    ) : null;
  };

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="bg-gray-800 rounded-lg p-4 shadow-md h-30 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-300">
              <TransactionDate date={transaction.creationDate} />
            </span>
            <span className="text-sm font-semibold text-gray-200">{transaction.type.replace("_", " ")}</span>
          </div>
          <div className="flex justify-between items-center">
            <TransactionAmount type={transaction.type} amount={transaction.amount} />
            <span className="text-sm text-gray-400 mt-2">
              <div className="font-medium text-gray-200">€{transaction.balance}</div>
              <div className="text-[.6rem] text-gray-400 uppercase text-right">Balance</div>
            </span>
          </div>
          <div>{renderIBAN(transaction)}</div>
        </div>
      ))}
    </div>
  );
};
