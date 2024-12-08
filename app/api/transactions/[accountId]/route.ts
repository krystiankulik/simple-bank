import { NextResponse } from "next/server";
import { getTransactions } from "@/services/transactionService";

export async function GET(request: Request, { params }: { params: { accountId: string } }) {
  const accountId = params.accountId;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  if (!accountId) {
    return NextResponse.json({ message: "Account ID is required" }, { status: 400 });
  }

  try {
    const { transactions, totalCount } = await getTransactions(accountId, page, limit);
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      {
        transactions,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage: page < totalPages,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Account not found") {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }

    console.error("Internal Server Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
