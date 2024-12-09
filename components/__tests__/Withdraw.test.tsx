import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Withdraw } from "@/components/operations/withdraw/Withdraw";
import { useWithdraw } from "@/components/operations/withdraw/useWithdraw";

jest.mock("@/components/operations/withdraw/useWithdraw");

describe("Withdraw", () => {
  it("handles user input and form submission", () => {
    const mockUseWithdraw = {
      amount: "0.00",
      isLoading: false,
      setAmount: jest.fn(),
      handleSubmit: jest.fn(),
      goToDashboard: jest.fn(),
    };

    (useWithdraw as jest.Mock).mockReturnValue(mockUseWithdraw);

    render(<Withdraw />);

    const input = screen.getByPlaceholderText("0.00");
    fireEvent.change(input, { target: { value: "50" } });
    expect(mockUseWithdraw.setAmount).toHaveBeenCalledWith("50");

    const submitButton = screen.getByText("Withdraw");
    fireEvent.submit(submitButton);
    expect(mockUseWithdraw.handleSubmit).toHaveBeenCalled();

    const dashboardButton = screen.getByText("Back to Dashboard");
    fireEvent.click(dashboardButton);
    expect(mockUseWithdraw.goToDashboard).toHaveBeenCalled();
  });
});
