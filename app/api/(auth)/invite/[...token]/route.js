import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function GetToken(req, context) {
  const token = context.params.token[0];
  if (!token) {
    return NextResponse.json(
      { error: "Please fill out all required fields." },
      {
        status: 400,
      }
    );
  }
  try {
    // Checking if email address / username exists in the DB
    const InviteExists = await prisma.family.findFirst({
      where: { invite_token: token },
    });
    // If user Exists
    if (!InviteExists) {
      return NextResponse.json(
        {
          error: "Invalid Invite, Redirecting to login Page ... ",
        },
        {
          status: 404,
        }
      );
    }

    const today = new Date();
    // We Check if token expired or no
    if (today > new Date(InviteExists.invite_token_expiry)) {
      return NextResponse.json(
        {
          error: "Invite Link expired !",
        },
        {
          status: 403,
        }
      );
    }
    return NextResponse.json(
      { name: InviteExists.familyName },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Oops! Something went wrong on our end. Please try again later",
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
async function AcceptInvite(req, context) {
  const body = await req.json();
  const session = await getServerSession(authOptions);
  const token = context.params.token[0];
  const { role } = body;
  if (!role) {
    return NextResponse.json(
      { error: "Please fill out your role within the family group." },
      {
        status: 400,
      }
    );
  }
  // We check if the user is Authenticated

  if (token && session) {
    try {
      // Checking if email address / username exists in the DB
      const userExist = await prisma.users.findUnique({
        where: { id: Number(session.user.id) },
      });
      // If user Does not Exists
      if (!userExist) {
        return NextResponse.json(
          {
            error: "User does not exists ",
          },
          {
            status: 404,
          }
        );
      }
      // Checking the Invite token validity
      const InviteExists = await prisma.family.findFirst({
        where: { invite_token: token },
      });
      if (!InviteExists) {
        return NextResponse.json(
          {
            error: "Invalid Invite, Redirecting to login Page ... ",
          },
          {
            status: 404,
          }
        );
      }
      const today = new Date();
      // We Check if token expired or no
      if (today > new Date(InviteExists.invite_token_expiry)) {
        return NextResponse.json(
          {
            error: "Invite Link expired !",
          },
          {
            status: 403,
          }
        );
      }
      // Update user details
      const user = await prisma.users.update({
        where: { id: Number(userExist.id) },
        data: {
          familyID: Number(InviteExists.id),
          date_updated: new Date(),
          role: Number(role),
        },
      });
      // Delete Invite token

      const UpdateFamily = await prisma.family.update({
        where: { id: InviteExists.id },
        data: {
          invite_token: null,
          invite_token_expiry: null,
          date_updated: new Date(),
        },
      });
      return NextResponse.json(
        { id: UpdateFamily.id, message: "Invite Accepted Successfully " },
        { status: 200 }
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
      error: "Token Expired",
    },
    {
      status: 401,
    }
  );
}
export { GetToken as GET, AcceptInvite as POST };
