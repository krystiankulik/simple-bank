import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { Account, Prisma, User } from "@prisma/client";
import { CountryCode, IBAN } from "ibankit";

const generateRandomIBAN = (): string => {
  return IBAN.random(CountryCode.ES).toString();
};

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
    const user = await prisma.user.findUnique({
      where: { username },
      include: { account: true },
    });

    if (user) {
      return getUserDetailsResponse(user, user.account, 200);
    } else {
      const newAccount = await prisma.account.create({
        data: {
          balance: new Prisma.Decimal(0),
          IBAN: generateRandomIBAN(),
          user: {
            create: {
              username,
            },
          },
        },
        include: {
          user: true,
        },
      });

      return getUserDetailsResponse(newAccount.user, newAccount, 201);
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(error.message);
        return NextResponse.json({ message: "Username already exists" }, { status: 409 });
      }
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
