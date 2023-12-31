import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
const prisma = new PrismaClient();

async function getStats(req, context) {
  const { transactionID } = context.params;
  // Check if User is authenticated and eligible
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      // We export the Stats from DB based on the UserID from the session :
      const Stats =
        await prisma.$queryRaw`SELECT expenses.ExpenseID, expenses.Description,expenses.Date_created,expenses.Total,expensecategories.CategoryName AS category ,expenses.UserID, users.name,users.profilePicture,users.address FROM expenses INNER JOIN expensecategories ON expenses.CategoryID = expensecategories.CategoryID INNER JOIN users ON expenses.UserID = users.id WHERE expenses.ExpenseID=${Number(
          transactionID
        )}`;
      if (Number(session.user.id) !== Stats[0].UserID) {
        return NextResponse.json(
          {
            error: "Access denied",
          },
          {
            status: 401,
          }
        );
      }

      return NextResponse.json(
        { Stats },
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
export { getStats as GET };
