import { POST } from "@/app/api/deposit/route";
import { depositToAccount } from "@/services/depositService";

jest.mock("@/services/depositService", () => ({
  depositToAccount: jest.fn(),
}));

describe("POST /api/deposit", () => {
  it("should return 404 if account is not found", async () => {
    (depositToAccount as jest.Mock).mockRejectedValue(new Error("Account not found"));

    const request = new Request("https://placeholder.simple-bank.com/api/deposit", {
      method: "POST",
      body: JSON.stringify({ accountId: "nonexistent", amount: 100 }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.message).toBe("Account not found");
  });

  it("should return 200 on successful deposit", async () => {
    (depositToAccount as jest.Mock).mockResolvedValue({
      balance: { toNumber: () => 1100 },
    });

    const request = new Request("https://placeholder.simple-bank.com/api/deposit", {
      method: "POST",
      body: JSON.stringify({ accountId: "1", amount: 100 }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe("Deposit successful");
    expect(body.balance).toBe("1100.00");
  });
});
