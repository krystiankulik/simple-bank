import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Deposit } from "@/components/operations/deposit/Deposit";
import { useDeposit } from "@/components/operations/deposit/useDeposit";

jest.mock("@/components/operations/deposit/useDeposit");

describe("Deposit", () => {
  it("handles user input and form submission", () => {
    const mockUseDeposit = {
      amount: "0.00",
      isLoading: false,
      setAmount: jest.fn(),
      handleSubmit: jest.fn((e) => e.preventDefault()),
      goToDashboard: jest.fn(),
    };

    (useDeposit as jest.Mock).mockReturnValue(mockUseDeposit);

    render(<Deposit />);

    const input = screen.getByPlaceholderText("0.00");
    fireEvent.change(input, { target: { value: "100" } });
    expect(mockUseDeposit.setAmount).toHaveBeenCalledWith("100");

    const submitButton = screen.getByText("Deposit");
    fireEvent.click(submitButton);
    expect(mockUseDeposit.handleSubmit).toHaveBeenCalled();

    const dashboardButton = screen.getByText("Back to Dashboard");
    fireEvent.click(dashboardButton);
    expect(mockUseDeposit.goToDashboard).toHaveBeenCalled();
  });
});
