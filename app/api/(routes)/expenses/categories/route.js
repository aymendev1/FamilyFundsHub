import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
const prisma = new PrismaClient();

async function getCategories() {
  // Check if User is authenticated and eligible
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      // We export the Stats from DB based on the UserID from the session :
      const Categories = await prisma.$queryRaw`
SELECT expenses.UserID, expensecategories.CategoryName, SUM(CASE WHEN expenses.CategoryID = expensecategories.CategoryID THEN expenses.Total ELSE 0 END) AS TotalSpent FROM expenses JOIN expensecategories ON expenses.CategoryID = expensecategories.CategoryID WHERE expenses.UserID = ${Number(
        session.user.id
      )} AND MONTH(expenses.Date_created) = MONTH(CURRENT_DATE()) AND YEAR(expenses.Date_created) = YEAR(CURRENT_DATE()) GROUP BY expenses.UserID, expensecategories.CategoryName ORDER BY TotalSpent DESC
  `;
      return NextResponse.json(
        { Categories },
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
export { getCategories as GET };
