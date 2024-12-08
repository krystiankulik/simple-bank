"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { TransactionTable } from "@/components/dashboard/transactions/TransactionListContainer";
import { LoadingDots } from "@/components/dashboard/LoadingDots";
import toast from "react-hot-toast";

export interface Transaction {
  id: string;
  type: string;
  relatedIBAN: string | null;
  creationDate: string;
  balance: string;
  amount: string;
}

interface TransactionsResponse {
  balance: string;
  transactions: Transaction[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
  };
}

interface TransactionListProps {
  accountId: string;
}

export const TransactionInfiniteScroll = ({ accountId }: TransactionListProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      // adding small delay for better UX - avoiding loading state glitches.
      const response = await Promise.all([
        axios.get<TransactionsResponse>(`/api/account/${accountId}?page=${page}`),
        new Promise((resolve) => setTimeout(resolve, 300)),
      ]);

      const data = response[0].data;
      setTransactions((prev) => [...prev, ...data.transactions]);
      setHasMore(data.pagination.hasNextPage);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      toast.error("Error fetching transactions");
    }
  }, [accountId, page]);

  useEffect(() => {
    void fetchTransactions();
  }, []);

  const renderEndMessage = () => {
    if (transactions.length === 0) {
      return (
        <p className={"text-center py-4"}>
          <b>No transactions yet</b>
        </p>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full p-8 bg-gray-600">
      <h2 className="text-2xl font-bold mb-4 text-center">Transactions</h2>
      <InfiniteScroll
        dataLength={transactions.length}
        next={fetchTransactions}
        hasMore={hasMore}
        loader={<LoadingDots />}
        endMessage={renderEndMessage()}
      >
        <TransactionTable transactions={transactions} />
      </InfiniteScroll>
    </div>
  );
};
