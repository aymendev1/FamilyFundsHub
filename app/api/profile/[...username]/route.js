import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
const prisma = new PrismaClient();

async function getProfile(req, context) {
  const { username } = context.params;
  // Check if User is authenticated and eligible
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      // We export the profileDetails from DB based on the username from the params :
      const profile = await prisma.users.findUnique({
        where: { username: String(username) },
        select: {
          name: true,
          id: true,
          username: true,
          profilePicture: true,
          coverPicture: true,
          bio: true,
          address: true,
          email: true,
          family: { select: { familyName: true } },
        },
      });
      if (!profile) {
        return NextResponse.json({}, { status: 404 });
      }
      // we convert the images to Base64
      const PPbase64 = profile.profilePicture
        .toString("base64")
        .replace("dataimage/jpegbase64", "data:image/jpeg;base64,");
      profile.profilePicture = PPbase64;
      const Coverbase64 = profile.coverPicture
        .toString("base64")
        .replace("dataimage/jpegbase64", "data:image/jpeg;base64,");
      profile.coverPicture = Coverbase64;

      return NextResponse.json(profile, {
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
export { getProfile as GET };
