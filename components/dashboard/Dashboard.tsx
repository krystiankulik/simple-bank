"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import UserInfo from "@/components/dashboard/UserInfo";
import FinancialActionButtons from "@/components/dashboard/FinancialActionButtons";
import { TransactionInfiniteScroll } from "@/components/dashboard/transactions/TransactionInfiniteScroll";
import toast from "react-hot-toast";
import { LoadingDots } from "@/components/dashboard/LoadingDots";

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
        toast.error("Error fetching user details");
      } finally {
        setLoading(false);
      }
    };

    void fetchUserData();
  }, [username]);

  if (loading) {
    return (
      <div className={"h-full bg-base-100"}>
        <LoadingDots />
      </div>
    );
  }

  return (
    <div>
      {iban && balance && <UserInfo balance={balance} iban={iban} username={username} />}
      {accountId && <FinancialActionButtons accountId={accountId} />}
      {accountId && <TransactionInfiniteScroll accountId={accountId} />}
    </div>
  );
};

export default Dashboard;
