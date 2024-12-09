import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { OperationButtons } from "@/components/dashboard/operation-buttons/OperationButtons";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("OperationButtons", () => {
  it("renders all operation buttons", () => {
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<OperationButtons />);

    expect(screen.getByText("Withdraw")).toBeVisible();
    expect(screen.getByText("Deposit")).toBeVisible();
    expect(screen.getByText("Transfer")).toBeVisible();
  });

  it("navigates to the correct route when buttons are clicked", () => {
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<OperationButtons />);

    fireEvent.click(screen.getByText("Withdraw"));
    expect(mockRouter.push).toHaveBeenCalledWith("/withdraw");

    fireEvent.click(screen.getByText("Deposit"));
    expect(mockRouter.push).toHaveBeenCalledWith("/deposit");

    fireEvent.click(screen.getByText("Transfer"));
    expect(mockRouter.push).toHaveBeenCalledWith("/transfer");
  });
});
