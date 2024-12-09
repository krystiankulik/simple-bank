import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TransactionDate } from "@/components/dashboard/transactions/TransactionDate";

describe("TransactionDate", () => {
  it("renders the formatted date correctly", () => {
    render(<TransactionDate date="2023-12-01T10:00:00Z" />);

    const formattedDate = screen.getByText("Dec 1, 23");
    expect(formattedDate).toBeVisible();
  });
});
