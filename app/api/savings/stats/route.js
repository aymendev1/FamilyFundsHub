import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
const prisma = new PrismaClient();

async function getStats() {
  // Check if User is authenticated and eligible
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      // We export the Stats from DB based on the UserID from the session :
      const Stats = await prisma.$queryRaw`
    SELECT
UserID,
DATE_FORMAT(Date_created, '%Y-%m') AS month,
SUM(Total) AS monthly_savings
FROM
users_savings_history
WHERE UserID=${Number(session.user.id)}
GROUP BY
UserID, month
ORDER BY
    month DESC;
  `;
      const Months = [];
      const stats = [];
      Stats.map((item) => {
        // We convert Date to text MM-YYYY format
        const date = new Date(item.month);
        const month = date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        Months.push(month);
        stats.push(item.monthly_savings);
      });

      return NextResponse.json(
        { Months, stats },
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
export { getStats as GET };
