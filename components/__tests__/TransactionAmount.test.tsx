import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { TransactionAmount } from "@/components/dashboard/transactions/TransactionAmount";

describe("TransactionAmount", () => {
  it("renders a positive amount for 'TRANSFER_IN'", () => {
    render(<TransactionAmount type="TRANSFER_IN" amount="100.00" />);

    const amountElement = screen.getByText("+100.00");
    expect(amountElement).toBeVisible();
    expect(amountElement).toHaveClass("text-green-600");
  });

  it("renders a positive amount for 'DEPOSIT'", () => {
    render(<TransactionAmount type="DEPOSIT" amount="200.00" />);

    const amountElement = screen.getByText("+200.00");
    expect(amountElement).toBeVisible();
    expect(amountElement).toHaveClass("text-green-600");
  });

  it("renders a negative amount for 'TRANSFER_OUT'", () => {
    render(<TransactionAmount type="TRANSFER_OUT" amount="50.00" />);

    const amountElement = screen.getByText("-50.00");
    expect(amountElement).toBeVisible();
    expect(amountElement).toHaveClass("text-red-600");
  });

  it("renders a negative amount for 'WITHDRAWAL'", () => {
    render(<TransactionAmount type="WITHDRAWAL" amount="75.00" />);

    const amountElement = screen.getByText("-75.00");
    expect(amountElement).toBeVisible();
    expect(amountElement).toHaveClass("text-red-600");
  });
});
