"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { useUserData } from "@/utils/useUser";
import { isValidAmount } from "@/utils/isValidAmount";

export const Deposit = () => {
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
      await axiosInstance.post<unknown>(`/deposit`, { accountId: accountId, amount: amount });
      toast.success("Deposit successful");
    } finally {
      setAmount("");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-full items-center bg-base-100">
      <div className="bg-neutral p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Deposit Funds</h1>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
              className="w-full input"
            />
          </div>
          <button type="submit" disabled={isLoading} className="btn btn-primary w-full my-2">
            {isLoading ? "Processing..." : "Deposit"}
          </button>
        </form>
        <button onClick={() => router.push("/dashboard")} className="btn btn-primary btn-outline w-full my-2">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};
