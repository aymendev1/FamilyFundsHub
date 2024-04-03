import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
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
    const userExist = await prisma.users.findFirst({
      where: { reset_token: token },
    });
    // If user Exists
    if (!userExist) {
      return NextResponse.json(
        {
          error: "Invalid Token, Redirecting to password reset page ... ",
        },
        {
          status: 404,
        }
      );
    }

    const today = new Date();
    // We Check if token expired or no
    if (today > new Date(userExist.reset_token_expiry)) {
      return NextResponse.json(
        {
          error: "Link expired !",
        },
        {
          status: 403,
        }
      );
    }
    return NextResponse.json({ message: "Token Valid" }, { status: 200 });
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
async function UpdatePass(req, context) {
  const body = await req.json();
  const token = context.params.token[0];
  const { newPass } = body;
  if (!newPass) {
    return NextResponse.json(
      { error: "Please fill out required fields." },
      {
        status: 400,
      }
    );
  }
  // We check if the user is Authenticated
  if (token) {
    try {
      // Checking if email address / username exists in the DB
      const userExist = await prisma.users.findFirst({
        where: { reset_token: token },
      });
      // If user Exists
      if (!userExist) {
        return NextResponse.json(
          {
            error: "Invalid Token, Redirecting to password reset page ... ",
          },
          {
            status: 404,
          }
        );
      }
      //we check if username or email is already user by another member
      const hashedPassword = await bcrypt.hash(newPass, 10);
      const user = await prisma.users.update({
        where: { id: Number(userExist.id) },
        data: {
          password: hashedPassword,
          date_updated: new Date(),
          reset_token: null,
          reset_token_expiry: null,
        },
      });
      return NextResponse.json(
        { message: "Password Changed Correctly" },
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
export { GetToken as GET, UpdatePass as POST };
