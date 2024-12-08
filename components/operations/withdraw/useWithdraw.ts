"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { isValidAmount } from "@/utils/isValidAmount";
import { useUser } from "@/app/context/UserContext";

export const useWithdraw = () => {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { accountId } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountId) {
      toast.error("Account ID is missing");
      return;
    }

    const isValid = isValidAmount(amount);
    if (!isValid) {
      toast.error("Amount must be a positive number with two decimal places (e.g., 123.45)");
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post<unknown>(`/withdraw`, { accountId, amount });
      toast.success("Withdrawal successful");
    } catch (error) {
      console.error("Withdrawal failed", error);
    } finally {
      setAmount("");
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
