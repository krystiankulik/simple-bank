"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import UserInfo from "@/components/dashboard/UserInfo";
import FinancialActionButtons from "@/components/dashboard/FinancialActionButtons";
import { TransactionInfiniteScroll } from "@/components/dashboard/transactions/TransactionInfiniteScroll";

interface Account {
  id: string;
  balance: number;
  IBAN: string;
}

interface ApiResponse {
  account: Account;
}

const Dashboard: React.FC = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const router = useRouter();

  const [balance, setBalance] = useState<number | null>(null);
  const [iban, setIban] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!username) {
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.post<ApiResponse>("/user", { username: username });
        const data = response.data;
        setBalance(data?.account?.balance);
        setIban(data?.account?.IBAN);
        setAccountId(data?.account?.id);
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    void fetchUserData();
  }, [username]);

  if (loading) {
    return <span className="loading loading-spinner loading-xs"></span>;
  }

  return (
    <div>
      <UserInfo balance={balance} iban={iban} username={username} />
      {accountId && <FinancialActionButtons accountId={accountId} />}
      {accountId && <TransactionInfiniteScroll accountId={accountId} />}
    </div>
  );
};

export default Dashboard;
