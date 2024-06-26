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
          name: true,
          username: true,
          profilePicture: true,
          balance: true,
        },
      });
      user.profilePicture = user.profilePicture
        .toString("base64")
        .replace("dataimage/jpegbase64", "data:image/jpeg;base64,");

      const familyDetails = await prisma.family.findUnique({
        where: { id: user.familyID },
        select: { id: true, familyName: true },
      });
      const familyMembers = await prisma.users.findMany({
        where: { familyID: user.familyID },
        select: { id: true, name: true, profilePicture: true, role: true },
      });
      familyMembers.map((member) => {
        member.profilePicture = member.profilePicture
          .toString("base64")
          .replace("dataimage/jpegbase64", "data:image/jpeg;base64,");
      });
      const ExpensesCategories = await prisma.expensecategories.findMany({
        select: { CategoryID: true, CategoryName: true },
      });
      const UserSavingLastMonth = await prisma.users_savings_history.groupBy({
        by: ["date_created"],
        where: {
          UserID: user.id,
          date_created: {
            gte: new Date(
              new Date().getFullYear(),
              new Date().getMonth() - 1,
              1
            ),
            lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
        _sum: {
          total: true,
        },
        orderBy: {
          date_created: "desc",
        },
      });

      // Get the current date
      const currentDate = new Date();
      // Get the current month and year
      const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
      const currentYear = currentDate.getFullYear();
      // Create a formatted date string with day fixed at 01
      const formattedDate = `${currentYear}/${currentMonth
        .toString()
        .padStart(2, "0")}/01`;
      const userBudget = {
        incomeThisMonth: 0,
        ExpenseThisMonth: 0,
        UserBudget: user.balance,
        UserSavingLastMonth: UserSavingLastMonth[0]
          ? UserSavingLastMonth[0]?._sum
          : 0,
      };
      const userIncome = await prisma.income.findMany({
        where: {
          AND: [
            { UserID: user.id },
            { Date_created: { gte: new Date(formattedDate) } },
          ],
        },
        select: { Total: true },
      });
      // We sum up in case of multiple results
      userIncome.map((income) => {
        userBudget.incomeThisMonth += Number(income.Total);
      });
      const userExpense = await prisma.expenses.findMany({
        where: {
          AND: [
            { UserID: user.id },
            { Date_created: { gte: new Date(formattedDate) } },
          ],
        },
        select: { Total: true },
      });
      // We sum up in case of multiple results
      userExpense.map((expense) => {
        userBudget.ExpenseThisMonth += Number(expense.Total);
      });

      return NextResponse.json(
        {
          user,
          familyMembers,
          familyDetails,
          userBudget,
          ExpensesCategories,
        },
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
export { getUser as GET };
