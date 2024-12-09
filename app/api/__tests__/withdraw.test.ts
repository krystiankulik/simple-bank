import { POST } from "@/app/api/withdraw/route";
import { withdrawFromAccount } from "@/services/withdrawalService";

jest.mock("@/services/withdrawalService", () => ({
  withdrawFromAccount: jest.fn(),
}));

describe("POST /api/withdraw", () => {
  it("should return 404 if account is not found", async () => {
    (withdrawFromAccount as jest.Mock).mockRejectedValue(new Error("Account not found"));

    const request = new Request("https://placeholder.simple-bank.com/api/withdraw", {
      method: "POST",
      body: JSON.stringify({ accountId: "nonexistent", amount: 100 }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.message).toBe("Account not found");
  });

  it("should return 200 on successful withdraw", async () => {
    (withdrawFromAccount as jest.Mock).mockResolvedValue({
      balance: { toNumber: () => 900 },
    });

    const request = new Request("https://placeholder.simple-bank.com/api/withdraw", {
      method: "POST",
      body: JSON.stringify({ accountId: "1", amount: 100 }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe("Withdraw successful");
    expect(body.balance).toBe("900.00");
  });
});
