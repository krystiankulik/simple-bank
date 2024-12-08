import prisma from "@/utils/db";
import { Prisma } from "@prisma/client";
import { CountryCode, IBAN } from "ibankit";

const generateRandomIBAN = (): string => {
  return IBAN.random(CountryCode.ES).toString();
};

export async function getUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
    include: { account: true },
  });
}

export async function createUserWithAccount(username: string) {
  return prisma.account.create({
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
}
