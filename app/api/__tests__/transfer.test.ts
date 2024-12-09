import { POST } from "@/app/api/transfer/route";
import { transferBetweenAccounts, validateIBAN } from "@/services/transferService";

jest.mock("@/services/transferService", () => ({
  transferBetweenAccounts: jest.fn(),
  validateIBAN: jest.fn(),
}));

describe("POST /api/transfer", () => {
  it("should return 400 for invalid IBAN", async () => {
    (validateIBAN as jest.Mock).mockResolvedValue(false);

    const request = new Request("https://placeholder.simple-bank.com/api/transfer", {
      method: "POST",
      body: JSON.stringify({ accountId: "1", amount: 100, transferRecipientIBAN: "INVALID_IBAN" }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.message).toBe("Invalid IBAN");
  });

  it("should return 200 on successful transfer", async () => {
    (validateIBAN as jest.Mock).mockResolvedValue(true);
    (transferBetweenAccounts as jest.Mock).mockResolvedValue({
      updatedSenderAccount: { balance: { toNumber: () => 900 } },
      transactionMessage: "Money transferred internally",
    });

    const request = new Request("https://placeholder.simple-bank.com/api/transfer", {
      method: "POST",
      body: JSON.stringify({ accountId: "1", amount: 100, transferRecipientIBAN: "VALID_IBAN" }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe("Money transferred internally");
    expect(body.balance).toBe("900.00");
  });
});
