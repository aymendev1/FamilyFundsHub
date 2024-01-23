import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
const prisma = new PrismaClient();

async function RegisterUser(req) {
  const body = await req.json();
  const { name, email, password, username, role } = body;
  if (!name || !email || !password || !username || !role) {
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
      where: {
        OR: [
          {
            email: email,
          },
          {
            username: username,
          },
        ],
      },
    });
    // If user Exists
    if (userExist) {
      return NextResponse.json(
        {
          error:
            "Sorry, this username / email is already taken. Please choose another one",
        },
        {
          status: 400,
        }
      );
    }
    // We hash teh password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        username: username,
        role: role,
      },
    });
    return NextResponse.json(user, { status: 200 });
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
async function UpdatePass(req) {
  const body = await req.json();
  const session = await getServerSession(authOptions);
  const { oldPass, newPass } = body;
  if (!oldPass || !newPass) {
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
      // we call the password
      const userPass = await prisma.users.findUnique({
        where: { id: Number(session.user.id) },
        select: {
          password: true,
        },
      });
      //we check if username or email is already user by another member
      const passwordMatch = await bcrypt.compare(oldPass, userPass.password);

      if (passwordMatch) {
        const hashedPassword = await bcrypt.hash(newPass, 10);
        const user = await prisma.users.update({
          where: { id: Number(session.user.id) },
          data: {
            password: hashedPassword,
            date_updated: new Date(),
          },
        });
        return NextResponse.json(
          { message: "Password Changed Correctly" },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { message: "Old password provided doesn't match the current password" },
        { status: 403 }
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
export { RegisterUser as POST, UpdatePass as PUT };
