import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
const prisma = new PrismaClient();
async function CreateIncome(req) {
  const body = await req.json();
  const session = await getServerSession(authOptions);

  const { Total, Description } = body;
  if (!Total || !Description) {
    return NextResponse.json(
      { error: "Please fill out all required fields." },
      {
        status: 400,
      }
    );
  }
  // We check if the user is Authenticated
  if (session) {
    try {
      // We create the expense for the sender
      const income = await prisma.income.create({
        data: {
          UserID: Number(session.user.id),
          Description: Description,
          Total: parseFloat(Total),
          FamilyID: Number(session.user.familyId),
        },
      });
      // We Dedicate the money from to the sender  Balance
      const updateSenderBalance = await prisma.users.update({
        where: { id: Number(session.user.id) },
        data: { balance: { increment: parseFloat(Total) } },
      });
      return NextResponse.json({ income }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          error:
            "Oops! Something went wrong on our end. Please try again later",
          info: error.message,
        },
        {
          status: 500,
        }
      );
    } finally {
      await prisma.$disconnect();
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
export { CreateIncome as POST };
