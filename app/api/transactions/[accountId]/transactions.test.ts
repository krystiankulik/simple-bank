import { GET } from "@/app/api/transactions/[accountId]/route";
import { getTransactions } from "@/services/transactionService";

jest.mock("@/services/transactionService", () => ({
  getAccountDetails: jest.fn(),
  getTransactions: jest.fn(),
}));

describe("GET /api/transactions", () => {
  it("should return 200 with transactions and pagination", async () => {
    (getTransactions as jest.Mock).mockResolvedValue({
      transactions: [
        {
          id: "txn1",
          type: "TRANSFER",
          relatedIBAN: "DE89 3704 0044 0532 0130 00",
          creationDate: "2024-12-01T12:00:00Z",
          balance: "1000.00",
          amount: "100.00",
        },
      ],
      totalCount: 1,
    });

    const request = new Request("https://placeholder.simple-bank.com/api/transactions?page=1&limit=10");
    const response = await GET(request, { params: Promise.resolve({ accountId: "1" }) });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.transactions).toHaveLength(1);
    expect(body.transactions[0].id).toBe("txn1");
    expect(body.pagination.currentPage).toBe(1);
    expect(body.pagination.totalPages).toBe(1);
    expect(body.pagination.hasNextPage).toBe(false);
  });
});
