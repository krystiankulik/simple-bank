import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TransactionListDesktop } from "@/components/dashboard/transactions/TransactionListDesktop";

const mockTransactions = [
  {
    id: "1",
    creationDate: "2023-12-01T10:00:00Z",
    type: "TRANSFER_IN",
    amount: "100.00",
    balance: "1100.00",
    relatedIBAN: "DE89 3704 0044 0532 0130 00",
  },
  {
    id: "2",
    creationDate: "2023-12-02T11:00:00Z",
    type: "WITHDRAWAL",
    amount: "50.00",
    balance: "1050.00",
    relatedIBAN: "DE89 3704 0044 0532 0130 01",
  },
];

describe("TransactionListDesktop", () => {
  it("renders the table with headers", () => {
    render(<TransactionListDesktop transactions={mockTransactions} />);

    expect(screen.getByText("Date")).toBeVisible();
    expect(screen.getByText("Type")).toBeVisible();
    expect(screen.getByText("Amount")).toBeVisible();
    expect(screen.getByText("Balance")).toBeVisible();
    expect(screen.getByText("Sender/Recipient IBAN")).toBeVisible();
  });

  it("renders the transaction data correctly", () => {
    render(<TransactionListDesktop transactions={mockTransactions} />);

    expect(screen.getByText("Dec 1, 23")).toBeVisible();
    expect(screen.getByText("TRANSFER IN")).toBeVisible();
    expect(screen.getByText("+100.00")).toBeVisible();
    expect(screen.getByText("1100.00")).toBeVisible();
    expect(screen.getByText("DE89 3704 0044 0532 0130 00")).toBeVisible();

    expect(screen.getByText("Dec 2, 23")).toBeVisible();
    expect(screen.getByText("WITHDRAWAL")).toBeVisible();
    expect(screen.getByText("-50.00")).toBeVisible();
    expect(screen.getByText("1050.00")).toBeVisible();
    expect(screen.getByText("DE89 3704 0044 0532 0130 01")).toBeVisible();
  });

  it("renders an empty table body if no transactions are provided", () => {
    render(<TransactionListDesktop transactions={[]} />);

    expect(screen.queryByText("Dec 1, 23")).not.toBeInTheDocument();
    expect(screen.queryByText("TRANSFER IN")).not.toBeInTheDocument();
  });
});
