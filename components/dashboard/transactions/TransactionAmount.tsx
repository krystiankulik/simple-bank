import React from "react";

interface TransactionAmountProps {
  type: string;
  amount: string;
}

export const TransactionAmount: React.FC<TransactionAmountProps> = ({ type, amount }) => {
  const isPositive = (type: string) => {
    return type === "TRANSFER_IN" || type === "DEPOSIT";
  };

  return (
    <span className={`${isPositive(type) ? "text-green-600" : "text-red-600"}`}>
      {isPositive(type) ? `+${amount}` : `-${amount}`}
    </span>
  );
};
