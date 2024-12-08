"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { useUserData } from "@/utils/useUser";
import { isValidAmount } from "@/utils/isValidAmount";
import { IBAN } from "ibankit";

export const useTransfer = () => {
  const [amount, setAmount] = useState<string>("");
  const [recipientIBAN, setRecipientIBAN] = useState<string>("");
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

    if (!IBAN.isValid(recipientIBAN)) {
      toast.error("IBAN is not valid");
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post<unknown>(`/transfer`, {
        accountId: accountId,
        amount: amount,
        transferRecipientIBAN: recipientIBAN,
      });
      toast.success("Transfer successful");
      setAmount("");
      setRecipientIBAN("");
    } catch (error) {
      toast.error("Transfer failed");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    amount,
    recipientIBAN,
    isLoading,
    setAmount,
    setRecipientIBAN,
    handleSubmit,
    goToDashboard: () => router.push("/dashboard"),
  };
};
