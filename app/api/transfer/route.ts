import { NextResponse } from "next/server";
import { transferBetweenAccounts, validateIBAN } from "@/services/transferService";

export async function POST(req: Request) {
  try {
    const { accountId, amount, transferRecipientIBAN } = await req.json();

    if (!accountId || !amount || amount <= 0 || !transferRecipientIBAN) {
      return NextResponse.json({ message: "Invalid request parameters" }, { status: 400 });
    }

    if (!(await validateIBAN(transferRecipientIBAN))) {
      return NextResponse.json({ message: "Invalid IBAN" }, { status: 400 });
    }

    const { updatedSenderAccount, transactionMessage } = await transferBetweenAccounts(
      accountId,
      transferRecipientIBAN,
      amount,
    );

    return NextResponse.json(
      {
        balance: updatedSenderAccount.balance.toNumber().toFixed(2),
        message: transactionMessage,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Sender account not found") {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }

    if (error instanceof Error && error.message === "Insufficient funds") {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    console.error("Internal Server Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
