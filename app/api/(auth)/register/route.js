import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
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
            Email: email,
          },
          {
            Username: username,
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
        Full_Name: name,
        Email: email,
        Password: hashedPassword,
        Username: username,
        Role: role,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Oops! Something went wrong on our end. Please try again later",
      },
      {
        status: 500,
      }
    );
  }
}
