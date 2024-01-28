import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
const prisma = new PrismaClient();
async function getSavingGoals() {
  // Check if User is authenticated and eligible
  const session = await getServerSession(authOptions);
  if (session && session.user.role === 0) {
    try {
      // We export the Stats from DB based on the UserID from the session :
      const Savings = await prisma.family_savings.findMany({
        where: { FamilyID: session.user.familyId },
      });
      if (!Savings) {
        return NextResponse.json(
          { Savings },
          {
            status: 404,
          }
        );
      }
      return NextResponse.json(
        { Savings },
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
async function CreateSavingGoal(req) {
  const body = await req.json();
  const session = await getServerSession(authOptions);
  const { Status, Total, Description, StartDate, EndDate } = body;
  if (!Status || !Total || !Description || !StartDate || !EndDate) {
    return NextResponse.json(
      { error: "Please fill out all required fields." },
      {
        status: 400,
      }
    );
  }
  // We check if the user is Authenticated
  if (session && session.user.role === 0) {
    try {
      // We create the expense for the sender
      const SavingGoal = await prisma.family_savings.create({
        data: {
          FamilyID: Number(session.user.familyId),
          Description: Description,
          total: parseFloat(Total),
          date_start: new Date(StartDate),
          date_end: new Date(EndDate),
          Status: Status,
        },
      });
      return NextResponse.json({ SavingGoal }, { status: 200 });
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
export { getSavingGoals as GET, CreateSavingGoal as POST };
