"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { useUserData } from "@/utils/useUser";
import { isValidAmount } from "@/utils/isValidAmount";

export const Withdraw = () => {
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

    const isValid = isValidAmount(amount);
    if (!isValid) {
      toast.error("Amount must be a positive number with two decimal places (e.g., 123.45)");
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post<unknown>(`/withdraw`, { accountId: accountId, amount: amount });
      toast.success("Withdrawal successful");
    } catch (error) {
      console.error("Withdrawal failed");
    } finally {
      setAmount("");
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6">Withdraw Funds</h1>
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
          {isLoading ? "Processing..." : "Withdraw"}
        </button>
      </form>
      <button onClick={() => router.push("/dashboard")} className="btn btn-primary btn-outline w-full my-2">
        Back to Dashboard
      </button>
    </>
  );
};