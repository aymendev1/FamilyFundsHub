import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();
function EncodingPicture(imagePath) {
  // Step 1: Read the image file as a buffer
  const imageBuffer = fs.readFileSync(imagePath);

  // Step 2: Encode the buffer to base64
  const base64Encoded =
    "data:image/jpeg;base64," + imageBuffer.toString("base64");
  // Step 3: Convert the base64-encoded string back to a buffer
  const decodedBuffer = Buffer.from(base64Encoded, "base64");
  return decodedBuffer;
}
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
    const PProfilePath = path.join(process.cwd(), "public/boyDefaultPP.jpg");
    const PPBuffer = EncodingPicture(PProfilePath);
    const CoverPath = path.join(process.cwd(), "public/defaultCover.jpg");
    const CoverBuffer = EncodingPicture(CoverPath);

    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        username: username,
        role: role,
        profilePicture: PPBuffer,
        coverPicture: CoverBuffer,
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
async function CreateFamily(req) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const { name } = body;
  if (!name) {
    return NextResponse.json(
      { error: "Please fill out all required fields." },
      {
        status: 400,
      }
    );
  }
  if (session) {
    try {
      //we Create a new Family and we update the family Column in user Table
      const newFamily = await prisma.family.create({
        data: { familyName: name },
      });
      const user = await prisma.users.update({
        where: { id: Number(session.user.id) },
        data: {
          familyID: newFamily.id,
          role: 0,
          date_updated: new Date(),
        },
      });

      return NextResponse.json({ id: newFamily.id }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          error:
            "Oops! Something went wrong on our end. Please try again later",
          Details: error,
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
export { RegisterUser as POST, UpdatePass as PUT, CreateFamily as PATCH };
