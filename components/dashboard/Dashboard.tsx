"use client";

import { TransactionInfiniteScroll } from "@/components/dashboard/transactions/TransactionInfiniteScroll";
import { LoadingDots } from "@/components/common/LoadingDots";
import { useDashboard } from "@/components/dashboard/useDashboard";
import { OperationButtons } from "@/components/dashboard/operation-buttons/OperationButtons";
import { UserInfo } from "@/components/dashboard/user-info/UserInfo";

export const Dashboard = () => {
  const { balance, iban, accountId, username, loading } = useDashboard();

  if (loading) {
    return (
      <div className={"h-full bg-base-100"}>
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className={"h-full overflow-hidden"}>
      <UserInfo balance={balance} iban={iban} username={username || ""} />
      {accountId && <OperationButtons />}
      {accountId && <TransactionInfiniteScroll accountId={accountId} />}
    </div>
  );
};
