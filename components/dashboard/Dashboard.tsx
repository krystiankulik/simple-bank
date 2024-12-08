"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import UserInfo from "@/components/dashboard/UserInfo";
import FinancialActionButtons from "@/components/dashboard/FinancialActionButtons";
import { TransactionInfiniteScroll } from "@/components/dashboard/transactions/TransactionInfiniteScroll";
import toast from "react-hot-toast";
import { LoadingDots } from "@/components/dashboard/LoadingDots";
import { useUserData } from "@/utils/useUser";

interface Account {
  id: string;
  balance: number;
  IBAN: string;
}

interface ApiResponse {
  account: Account;
}

const Dashboard: React.FC = () => {
  const { getUsername, getAccountId, saveAccountId } = useUserData();
  const username = getUsername();
  const accountId = getAccountId();

  const router = useRouter();

  const [balance, setBalance] = useState<number | null>(null);
  const [iban, setIban] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!username) {
      router.push("/");
    }

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.post<ApiResponse>("/user", { username: username });
        const data = response.data;
        setBalance(data?.account?.balance);
        setIban(data?.account?.IBAN);
        saveAccountId(data?.account?.id);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error("Error fetching user details");
      } finally {
        setLoading(false);
      }
    };

    void fetchUserData();
  }, [username, saveAccountId, router]);

  if (loading) {
    return (
      <div className={"h-full bg-base-100"}>
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className={"h-full overflow-hidden"}>
      {iban && balance && <UserInfo balance={balance} iban={iban} username={username || ""} />}
      {accountId && <FinancialActionButtons />}
      {accountId && <TransactionInfiniteScroll accountId={accountId} />}
    </div>
  );
};

export default Dashboard;
