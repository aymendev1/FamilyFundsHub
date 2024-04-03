import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
const prisma = new PrismaClient();

async function getStats(req, context) {
  const { contrID } = context.params;
  // Check if User is authenticated and eligible
  const session = await getServerSession(authOptions);
  if (session && session.user.role === 0) {
    try {
      // We export the Stats from DB based on the UserID from the session :
      const Details = await prisma.family_savings_history.findUnique({
        where: { SavingsHistoryID: Number(contrID) },
        select: {
          total: true,
          UserID: true,
          Status: true,
          Description: true,
          date_created: true,
          family_savings: {
            select: {
              Description: true,
            },
          },
          users: {
            select: {
              name: true,
              profilePicture: true,
            },
          },
        },
      });
      if (!Details) {
        return NextResponse.json(
          {
            error: "Not Found",
          },
          {
            status: 404,
          }
        );
      }
      Details.users.profilePicture = Details.users.profilePicture
        .toString("base64")
        .replace("dataimage/jpegbase64", "data:image/jpeg;base64,");
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
