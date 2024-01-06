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
export { getSavings as GET };
