"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { useUserData } from "@/utils/useUser";
import { isValidAmount } from "@/utils/isValidAmount";
import { IBAN } from "ibankit";

export const Transfer = () => {
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

  return (
    <div className="flex justify-center h-full items-center bg-base-100">
      <div className="bg-neutral p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Transfer Funds</h1>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
              className="w-full input mb-4"
            />
          </div>
          <div>
            <input
              type="text"
              value={recipientIBAN}
              onChange={(e) => setRecipientIBAN(e.target.value)}
              placeholder="Recipient's IBAN"
              required
              className="w-full input mb-6"
            />
          </div>
          <button type="submit" disabled={isLoading} className="btn btn-primary w-full my-2">
            {isLoading ? "Processing..." : "Transfer"}
          </button>
        </form>
        <button onClick={() => router.push("/dashboard")} className="btn btn-primary btn-outline w-full my-2">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};
