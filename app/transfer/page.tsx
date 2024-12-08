"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";

export default function TransferPage() {
  const [amount, setAmount] = useState("");
  const [recipientIBAN, setRecipientIBAN] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountId) {
      toast.error("Account ID is missing");
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post<unknown>(`/account/transfer`, {
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Transfer Funds</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
          </div>
          <div>
            <input
              type="text"
              value={recipientIBAN}
              onChange={(e) => setRecipientIBAN(e.target.value)}
              placeholder="Recipient's IBAN"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Transfer"}
          </button>
        </form>
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full mt-4 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
