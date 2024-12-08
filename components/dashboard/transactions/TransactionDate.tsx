import React from "react";

interface TransactionDateProps {
  date: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  }).format(date);
};

export const TransactionDate: React.FC<TransactionDateProps> = ({ date }) => {
  return <span>{formatDate(date)}</span>;
};
