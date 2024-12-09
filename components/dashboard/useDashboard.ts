"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";

interface Account {
  id: string;
  balance: number;
  IBAN: string;
}

interface ApiResponse {
  account: Account;
}

export const useDashboard = () => {
  const { username, accountId, setAccountId } = useUser();

  const [balance, setBalance] = useState<number | null>(null);
  const [iban, setIban] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!username) {
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      try {
        // adding small delay for better UX - avoiding loading state glitches.
        const response = await Promise.all([
          axiosInstance.post<ApiResponse>("/user", { username }),
          new Promise((resolve) => setTimeout(resolve, 300)),
        ]);

        const data = response[0].data;
        setBalance(data?.account?.balance);
        setIban(data?.account?.IBAN);
        setAccountId(data?.account?.id);
      } catch (err) {
        toast.error("Error fetching user details");
      } finally {
        setLoading(false);
      }
    };

    void fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return {
    balance,
    iban,
    accountId,
    username,
    loading,
  };
};
