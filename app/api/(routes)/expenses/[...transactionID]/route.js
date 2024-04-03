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
      const Details =
        await prisma.$queryRaw`SELECT expenses.ExpenseID, expenses.Description, expenses.isTransfer, expenses.receiver_id, expenses.Date_created, expenses.Total, expensecategories.CategoryName AS category, expenses.UserID, CASE WHEN expenses.isTransfer = 1 THEN users.name ELSE NULL END AS transferUserName, CASE WHEN expenses.isTransfer = true THEN users.profilePicture ELSE NULL END AS transferUserProfilePicture, CASE WHEN expenses.isTransfer = 1 THEN users.address ELSE NULL END AS transferUserAddress FROM expenses INNER JOIN expensecategories ON expenses.CategoryID = expensecategories.CategoryID LEFT JOIN users ON expenses.receiver_id = users.id WHERE expenses.ExpenseID = ${Number(
          transactionID
        )}`;
      if (Number(session.user.id) !== Details[0].UserID) {
        return NextResponse.json(
          {
            error: "Access denied",
          },
          {
            status: 401,
          }
        );
      }
      return NextResponse.json(Details, {
        status: 200,
      });
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
export { getStats as GET };
