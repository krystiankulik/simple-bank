"use client";

import { useTransfer } from "@/components/operations/transfer/useTransfer";

export const Transfer = () => {
  const { amount, recipientIBAN, isLoading, setAmount, setRecipientIBAN, handleSubmit, goToDashboard } = useTransfer();

  return (
    <>
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
      <button onClick={goToDashboard} className="btn btn-primary btn-outline w-full my-2">
        Back to Dashboard
      </button>
    </>
  );
};
