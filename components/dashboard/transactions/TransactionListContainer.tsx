"use client";

import React from "react";
import { Transaction } from "@/components/dashboard/transactions/TransactionInfiniteScroll";
import { TransactionListMobile } from "@/components/dashboard/transactions/TransactionListMobile";
import { TransactionListDesktop } from "@/components/dashboard/transactions/TransactionListDesktop";

interface TransactionProps {
  transactions: Transaction[];
}

export const TransactionTable: React.FC<TransactionProps> = ({ transactions }) => {
  return (
    <div className="w-full md:max-w-7xl mx-auto">
      <div className="hidden md:block">
        <TransactionListDesktop transactions={transactions} />
      </div>

      <div className="md:hidden">
        <TransactionListMobile transactions={transactions} />
      </div>
    </div>
  );
};
