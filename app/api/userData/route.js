import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
const prisma = new PrismaClient();

async function getUser() {
  // Check if User is authenticated and eligible
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      // Checking if email address / username exists in the DB
      const user = await prisma.users.findUnique({
        where: {
          id: Number(session.user.id),
        },
        select: {
          id: true,
          email: true,
          role: true,
          familyID: true,
        },
      });
      const familyBudget = await prisma.budget.findUnique({
        where: { familyID: user.familyID },
        select: { familyID: true, total_income: true, total_expense: true },
      });
      const familyDetails = await prisma.family.findUnique({
        where: { id: user.familyID },
        select: { id: true, familyName: true },
      });

      return NextResponse.json(
        { user, familyBudget, familyDetails },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          error:
            "Oops! Something went wrong on our end. Please try again later",
        },
        {
          status: 500,
        }
      );
    }
  }
  return NextResponse.json(
    {
      error: "User Not Authenticated",
    },
    {
      status: 401,
    }
  );
}
export { getUser as GET };
