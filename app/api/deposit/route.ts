import { NextResponse } from "next/server";
import { depositToAccount } from "@/services/depositService";

export async function POST(req: Request) {
  try {
    const { accountId, amount } = await req.json();

    if (!accountId || !amount || amount <= 0) {
      return NextResponse.json({ message: "Invalid account or withdraw amount" }, { status: 400 });
    }

    const result = await depositToAccount(accountId, amount);

    return NextResponse.json(
      {
        balance: result.balance.toNumber().toFixed(2),
        message: "Deposit successful",
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Account not found") {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }

    console.error("Internal Server Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
