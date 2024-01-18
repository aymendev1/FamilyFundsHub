import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
const prisma = new PrismaClient();
async function getSavingGoals() {
  // Check if User is authenticated and eligible
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      // We export the Stats from DB based on the UserID from the session :
      const Savings = await prisma.$queryRaw`
SELECT users_savings.SavingID, users_savings.Description,users_savings.date_updated,users_savings.total,users_savings.Status,users_savings.date_start,users_savings.date_end, users.name, users.profilePicture FROM users_savings INNER JOIN users ON users_savings.UserID = users.id WHERE users_savings.UserID=${Number(
        session.user.id
      )}
  `;
      Savings.map((saving) => {
        saving.profilePicture = saving.profilePicture
          .toString("base64")
          .replace("dataimage/jpegbase64", "data:image/jpeg;base64,");
      });
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
async function CreateSavingGoal(req) {
  const body = await req.json();
  const session = await getServerSession(authOptions);
  const { Status, Total, Description, StartDate, EndDate } = body;
  if (!Status || !Total || !Description || !StartDate || !EndDate) {
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
      const SavingGoal = await prisma.users_savings.create({
        data: {
          UserID: Number(session.user.id),
          Description: Description,
          total: parseFloat(Total),
          date_start: new Date(StartDate),
          date_end: new Date(EndDate),
          Status: Status,
        },
      });
      return NextResponse.json({ SavingGoal }, { status: 200 });
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
export { getSavingGoals as GET, CreateSavingGoal as POST };
