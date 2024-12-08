import { NextResponse } from "next/server";
import { getUserByUsername, createUserWithAccount } from "@/services/userService";
import { Account, Prisma, User } from "@prisma/client";
import { IBAN } from "ibankit";

const getUserDetailsResponse = (user: User, account: Account | null, status: number) => {
  return NextResponse.json(
    {
      username: user.username,
      id: user.id,
      account: {
        id: account?.id,
        balance: account?.balance.toNumber().toFixed(2) || 0.0,
        IBAN: IBAN.printFormat(account?.IBAN ?? "", " "),
      },
    },
    { status: status },
  );
};

export async function POST(req: Request) {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json({ message: "Username is required" }, { status: 400 });
  }

  try {
    const user = await getUserByUsername(username);

    if (user) {
      return getUserDetailsResponse(user, user.account, 200);
    }

    const newAccount = await createUserWithAccount(username);
    return getUserDetailsResponse(newAccount.user, newAccount, 201);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ message: "Username already exists" }, { status: 409 });
      }
    }

    console.error("Internal Server Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
