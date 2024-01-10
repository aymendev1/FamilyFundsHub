import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
const prisma = new PrismaClient();
async function getUserProfile() {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      // We export the profileDetails from DB based on the username from the params :
      const profile = await prisma.users.findUnique({
        where: { id: Number(session.user.id) },
        select: {
          username: true,
          profilePicture: true,
          coverPicture: true,
          address: true,
          bio: true,
          email: true,
          name: true,
        },
      });
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
async function UpdateProfile(req) {
  const body = await req.json();
  const session = await getServerSession(authOptions);

  const {
    newCoverPicture,
    username,
    bio,
    email,
    FullName,
    address,
    newProfilePicture,
  } = body;
  if ((!FullName || !username, !email)) {
    return NextResponse.json(
      { error: "Please fill out required fields." },
      {
        status: 400,
      }
    );
  }
  // We check if the user is Authenticated
  if (session) {
    try {
      const coverpic = Buffer.from(newCoverPicture, "base64");

      const Profilepic = Buffer.from(newProfilePicture, "base64");

      // We create the expense for the sender
      const user = await prisma.users.update({
        where: { id: Number(session.user.id) },
        data: {
          coverPicture: coverpic,
          profilePicture: Profilepic,
          bio: bio,
          username: username,
          email: email,
          address: address,
          date_updated: new Date(),
        },
      });

      return NextResponse.json({ username: user.username }, { status: 200 });
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
export { getUserProfile as GET, UpdateProfile as PUT };
