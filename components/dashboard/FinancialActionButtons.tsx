"use client";

import { useRouter } from "next/navigation";

interface FinancialActionButtonsProps {
  accountId: string;
}

export default function FinancialActionButtons({ accountId }: FinancialActionButtonsProps) {
  const router = useRouter();

  return (
    <div className={"w-full bg-base-100 py-8"}>
      <div className="flex flex-col gap-8  justify-center items-center md:flex-row ">
        <button
          onClick={() => router.push(`/withdraw?accountId=${accountId}`)}
          className="btn btn-primary w-64 md:w-20"
        >
          Withdraw
        </button>
        <button onClick={() => router.push(`/deposit?accountId=${accountId}`)} className="btn btn-primary w-64 md:w-20">
          Deposit
        </button>
        <button
          onClick={() => router.push(`/transfer?accountId=${accountId}`)}
          className="btn btn-primary w-64 md:w-20"
        >
          Transfer
        </button>
      </div>
    </div>
  );
}
