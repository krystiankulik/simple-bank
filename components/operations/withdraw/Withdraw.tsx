"use client";

import { useWithdraw } from "@/components/operations/withdraw/useWithdraw";

export const Withdraw = () => {
  const { amount, isLoading, setAmount, handleSubmit, goToDashboard } = useWithdraw();

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
      <button onClick={goToDashboard} className="btn btn-primary btn-outline w-full my-2">
        Back to Dashboard
      </button>
    </>
  );
};
