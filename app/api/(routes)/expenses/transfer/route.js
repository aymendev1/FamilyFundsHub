import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
const prisma = new PrismaClient();

async function MakeTransfer(req) {
  const body = await req.json();
  const session = await getServerSession(authOptions);

  const { id, amount } = body;
  if (!id || !amount) {
    return NextResponse.json(
      { error: "Please fill out all required fields." },
      {
        status: 400,
      }
    );
  }
  // We check if teh user session exists
  if (session) {
    try {
      // We create the expense for the sender
      const transfer = await prisma.expenses.create({
        data: {
          UserID: Number(session.user.id),
          CategoryID: 5, // Transfer is Listed as Category No 5
          Description: `Transfer of $${amount} `,
          Total: parseFloat(amount),
          isTransfer: true,
          receiver_id: Number(id),
        },
      });
      // We add the money transfer to the receiver Balance
      const updateReceiverBalance = await prisma.users.update({
        where: { id: Number(id) },
        data: { balance: { increment: parseFloat(amount) } },
      });
      // Create Income for the receiver
      const createIncome = await prisma.income.create({
        data: {
          FamilyID: updateReceiverBalance.familyID,
          UserID: updateReceiverBalance.id,
          Total: parseFloat(amount),
          Description: "Transfer Received",
          TransferID: transfer.ExpenseID,
        },
      });
      // We Dedicate the money from to the sender  Balance
      const updateSenderBalance = await prisma.users.update({
        where: { id: Number(session.user.id) },
        data: { balance: { decrement: parseFloat(amount) } },
      });
      return NextResponse.json(transfer, { status: 200 });
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
export { MakeTransfer as POST };
