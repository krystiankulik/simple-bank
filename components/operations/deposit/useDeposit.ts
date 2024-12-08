"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { useUserData } from "@/utils/useUser";
import { isValidAmount } from "@/utils/isValidAmount";

export const useDeposit = () => {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { getAccountId } = useUserData();
  const accountId = getAccountId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountId) {
      toast.error("Account ID is missing");
      return;
    }

    if (!isValidAmount(amount)) {
      toast.error("Amount must be a positive number with two decimal places (e.g., 123.45)");
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post<unknown>(`/deposit`, { accountId, amount });
      toast.success("Deposit successful");
      setAmount("");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    amount,
    isLoading,
    setAmount,
    handleSubmit,
    goToDashboard: () => router.push("/dashboard"),
  };
};
