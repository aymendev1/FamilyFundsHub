import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
const prisma = new PrismaClient();

async function getExpenses() {
  // Check if User is authenticated and eligible
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      // We export the Stats from DB based on the UserID from the session :
      const Expenses = await prisma.$queryRaw`
SELECT expenses.ExpenseID, expenses.Description,expenses.Date_created,expenses.Total,expensecategories.CategoryName AS category , users.name,users.profilePicture FROM expenses INNER JOIN expensecategories ON expenses.CategoryID = expensecategories.CategoryID INNER JOIN users ON expenses.UserID = ${Number(
        session.user.id
      )} WHERE users.id=13
  `;
      return NextResponse.json(
        { Expenses },
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
export { getExpenses as GET };
