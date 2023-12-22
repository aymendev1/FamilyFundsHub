import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        //Check if credentials are valid
        // By default credentials are being checked on the client side before submitting the login form
        if (!credentials.email || !credentials.password) {
          console.log(credentials);
          return NextResponse.json(
            {
              error: "Credentials are not provided",
            },
            { status: 404 }
          );
        }
        //Check if email exists
        const user = await prisma.users.findUnique({
          where: { Email: credentials.email },
        });
        // In case User not found
        if (!user) {
          console.log(`User not found`);
          return null;
        }
        // If user is found let's check the password
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.Password
        );
        // In case password does not match
        if (!passwordMatch) {
          return null;
        }
        // Return user information
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, account, profile, email, credentials);
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === "developement",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
