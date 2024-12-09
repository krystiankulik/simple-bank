import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UserInfo } from "@/components/dashboard/user-info/UserInfo";

describe("UserInfo Component", () => {
  it("renders user financial information when props are provided", () => {
    render(<UserInfo username="John Doe" iban="DE89 3704 0044 0532 0130 00" balance={1234.56} />);

    expect(screen.getByText("€1234.56")).toBeVisible();

    expect(screen.getByText("John Doe")).toBeVisible();

    expect(screen.getByText("DE89 3704 0044 0532 0130 00")).toBeVisible();
  });
});
