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
          where: { email: credentials.email },
          select: {
            email: true,
            id: true,
            password: true,
            familyID: true,
            role: true,
          },
        });
        // In case User not found
        if (!user) {
          console.log(`User not found`);
          return null;
        }
        // If user is found let's check the password
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
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
      authorization: {
        params: {},
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  events: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        //Let's check if user already exists
        const userExists = await prisma.users.findUnique({
          where: { email: profile.email },
        });
        // In case User not found, we create a new user
        if (!userExists) {
          // We use ProfileID as a default password as it's required in the DB model
          const hashedPassword = await bcrypt.hash(profile.sub, 10);
          const newUser = await prisma.users.create({
            data: {
              name: profile.name,
              email: profile.email,
              password: hashedPassword,
              username: profile.sub,
              profilePicture: profile.picture,
              role: 1,
            },
          });
          // we return user
          return newUser;
        }
        // In case user exists we return user
        return userExists;
      } else if (account.provider === "credentials") {
        return user;
      }
    },
  },
  callbacks: {
    async jwt({ token, user, trigger, session, profile, account }) {
      // In case of SignIn using Credentials
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      // if user, it means that the authentication was made via credentials
      if (account?.provider === "google") {
        //Let's check if user already exists
        const userExists = await prisma.users.findUnique({
          where: { email: profile.email },
          select: { name: true, familyID: true, role: true, id: true },
        });
        // In case User not found, we create a new user
        return {
          ...token,
          id: userExists.id,
          familyId: userExists.familyID,
          role: userExists.role,
        };
      }
      if (user) {
        // Passing necessary UserDetails into Token
        return {
          ...token,
          id: user.id,
          familyId: user.familyID,
          role: user.role,
        };
      }

      return token;
    },
    async session({ token, user, session }) {
      // Passing necessary UserDetails into Session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          familyId: token.familyId,
          role: token.role,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
