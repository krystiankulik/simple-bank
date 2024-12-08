"use client";

import { useRouter } from "next/navigation";

export default function FinancialActionButtons() {
  const router = useRouter();

  return (
    <div className={"w-full bg-base-100 py-8"}>
      <div className="flex flex-col gap-8  justify-center items-center md:flex-row ">
        <button onClick={() => router.push("/withdraw")} className="btn btn-primary w-64 md:w-20">
          Withdraw
        </button>
        <button onClick={() => router.push("/deposit")} className="btn btn-primary w-64 md:w-20">
          Deposit
        </button>
        <button onClick={() => router.push("/transfer")} className="btn btn-primary w-64 md:w-20">
          Transfer
        </button>
      </div>
    </div>
  );
}
