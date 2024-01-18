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
      )} WHERE users.id=${Number(session.user.id)}
  `;
      Expenses.map((expense) => {
        expense.profilePicture = expense.profilePicture
          .toString("base64")
          .replace("dataimage/jpegbase64", "data:image/jpeg;base64,");
      });
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
    } finally {
      // Disconnect from the Prisma client when done
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
async function CreateExpense(req) {
  const body = await req.json();
  const session = await getServerSession(authOptions);

  const { CategoryID, Total, Description, ExpenseDate } = body;
  if ((!CategoryID || !Total || !Description, !ExpenseDate)) {
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
      const expense = await prisma.expenses.create({
        data: {
          UserID: Number(session.user.id),
          CategoryID: Number(CategoryID),
          Description: Description,
          Total: parseFloat(Total),
          Date_created: new Date(ExpenseDate),
          isTransfer: false,
          receiver_id: 0,
        },
      });
      // We Dedicate the money from to the sender  Balance
      const updateSenderBalance = await prisma.users.update({
        where: { id: Number(session.user.id) },
        data: { balance: { decrement: parseFloat(Total) } },
      });
      return NextResponse.json({ expense }, { status: 200 });
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
export { getExpenses as GET, CreateExpense as POST };
