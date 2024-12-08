"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { useUserData } from "@/utils/useUser";
import axios from "axios";

interface Account {
  id: string;
  balance: number;
  IBAN: string;
}

interface ApiResponse {
  account: Account;
}

export const useDashboard = () => {
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
        saveAccountId(data?.account?.id);
      } catch (err) {
        toast.error("Error fetching user details");
      } finally {
        setLoading(false);
      }
    };

    void fetchUserData();
  }, [username, saveAccountId, router]);

  return {
    balance,
    iban,
    accountId,
    username,
    loading,
  };
};
