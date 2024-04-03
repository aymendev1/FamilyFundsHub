import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
const prisma = new PrismaClient();

async function getSavings() {
  // Check if User is authenticated and eligible
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      // We export the Stats from DB based on the UserID from the session :
      const Savings = await prisma.$queryRaw`
SELECT users_savings_history.SavingsHistoryID, users_savings_history.Description, users_savings_history.date_created, users_savings_history.total, users_savings_history.Status, users.name, users.profilePicture, users_savings.Description AS SavingName FROM users_savings_history INNER JOIN users ON users_savings_history.UserID = users.id INNER JOIN users_savings ON users_savings.SavingID = users_savings_history.SavingID WHERE users_savings_history.UserID = ${session.user.id} ORDER BY users_savings_history.date_created DESC
  `;
      Savings.map((saving) => {
        saving.profilePicture = saving.profilePicture
          .toString("base64")
          .replace("dataimage/jpegbase64", "data:image/jpeg;base64,");
      });

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
async function CreateSavingContr(req) {
  const body = await req.json();
  const session = await getServerSession(authOptions);

  const { SavingGoal, Total, Description, Status } = body;
  if (!SavingGoal || !Total || !Description || !Status) {
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
      // We create the saving data for the sender
      const contribution = await prisma.users_savings_history.create({
        data: {
          UserID: Number(session.user.id),
          SavingID: Number(SavingGoal),
          Description: Description,
          Status: Status,
          total: parseFloat(Total),
        },
      });
      const updateSavingGoal = await prisma.users_savings.update({
        where: { SavingID: Number(SavingGoal) },
        data: { date_updated: new Date() },
      });
      // We Dedicate the money from to the sender  Balance
      const updateUserBalance = await prisma.users.update({
        where: { id: Number(session.user.id) },
        data: { balance: { decrement: parseFloat(Total) } },
      });
      return NextResponse.json(
        { id: contribution.SavingsHistoryID },
        { status: 200 }
      );
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
export { getSavings as GET, CreateSavingContr as POST };
