"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

interface Transaction {
  id: string;
  type: string;
  transferRecipientIBAN: string | null;
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

export default function TransactionsList({ accountId }: TransactionListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<TransactionsResponse>(`/api/account/${accountId}?page=${page}`);
      setTransactions((prev) => [...prev, ...response.data.transactions]);
      setHasMore(response.data.pagination.hasNextPage);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setError("An error occurred while fetching transactions.");
    } finally {
      setIsLoading(false);
    }
  }, [accountId, page]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <InfiniteScroll
        dataLength={transactions.length}
        next={fetchTransactions}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>You have seen all transactions</b>
          </p>
        }
      >
        {transactions.map((transaction) => (
          <div key={transaction.id}>{JSON.stringify(transaction)}</div>
        ))}
      </InfiniteScroll>
      {error && <div>{error}</div>}
    </div>
  );
}
