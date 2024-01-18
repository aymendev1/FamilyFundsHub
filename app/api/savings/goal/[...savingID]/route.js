import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
const prisma = new PrismaClient();

async function getStats(req, context) {
  const { savingID } = context.params;
  // Check if User is authenticated and eligible
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      // We export the Stats from DB based on the UserID from the session :
      const SavingDetails = await prisma.users_savings.findUnique({
        where: {
          SavingID: Number(savingID),
        },
        select: {
          SavingID: true,
          UserID: true,
          Description: true,
          date_updated: true,
          date_created: true,
          total: true,
          Status: true,
          date_start: true,
          date_end: true,
          users: {
            select: {
              name: true,
              profilePicture: true,
            },
          },
        },
      });
      SavingDetails.map((saving) => {
        saving.profilePicture = saving.profilePicture
          .toString("base64")
          .replace("dataimage/jpegbase64", "data:image/jpeg;base64,");
      });
      if (!SavingDetails) {
        return NextResponse.json(
          {
            error: "Not Found",
          },
          {
            status: 404,
          }
        );
      }
      if (Number(session.user.id) !== SavingDetails.UserID) {
        return NextResponse.json(
          {
            error: "Access denied",
          },
          {
            status: 401,
          }
        );
      }
      const SavingHistory = await prisma.users_savings_history.findMany({
        where: {
          SavingID: Number(savingID),
        },
        orderBy: {
          date_created: "desc",
        },
        select: {
          SavingsHistoryID: true,
          SavingID: true,
          Description: true,
          date_created: true,
          total: true,
          Status: true,
          users: {
            select: {
              name: true,
              profilePicture: true,
            },
          },
          users_savings: {
            select: {
              Description: true,
            },
          },
        },
      });

      return NextResponse.json(
        { SavingDetails, SavingHistory },
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
