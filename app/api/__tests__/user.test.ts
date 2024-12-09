import { POST } from "@/app/api/user/route";
import { getUserByUsername, createUserWithAccount } from "@/services/userService";

jest.mock("@/services/userService", () => ({
  getUserByUsername: jest.fn(),
  createUserWithAccount: jest.fn(),
}));

describe("POST /api/user", () => {
  it("should return 200 if user exists", async () => {
    (getUserByUsername as jest.Mock).mockResolvedValue({
      id: "user1",
      username: "testuser",
      account: {
        id: "account1",
        balance: { toNumber: () => 100 },
        IBAN: "ES7921000813610123456789",
      },
    });

    const request = new Request("https://placeholder.simple-bank.com/api/user", {
      method: "POST",
      body: JSON.stringify({ username: "testuser" }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.username).toBe("testuser");
    expect(body.account.balance).toBe("100.00");
    expect(body.account.IBAN).toBe("ES79 2100 0813 6101 2345 6789");
  });

  it("should return 201 if user is created", async () => {
    (getUserByUsername as jest.Mock).mockResolvedValue(null);
    (createUserWithAccount as jest.Mock).mockResolvedValue({
      id: "account1",
      balance: { toNumber: () => 0 },
      IBAN: "ES7921000813610123456789",
      user: {
        id: "user1",
        username: "newuser",
      },
    });

    const request = new Request("https://placeholder.simple-bank.com/api/user", {
      method: "POST",
      body: JSON.stringify({ username: "newuser" }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.username).toBe("newuser");
    expect(body.account.balance).toBe("0.00");
    expect(body.account.IBAN).toBe("ES79 2100 0813 6101 2345 6789");
  });
});
