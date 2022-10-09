import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  debug: env.NODE_ENV !== "production",
  callbacks: {
    async signIn({ user }) {
      const workspaces = await prisma.user
        .findUnique({
          where: {
            id: user.id,
          },
        })
        .workspaces({
          where: {
            name: "default",
          },
        });

      if (!workspaces.length) {
        await prisma.workspace.create({
          data: {
            name: "default",
            owner: {
              connect: {
                id: user.id,
              },
            },
          },
        });
      }

      return true;
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: Number(env.EMAIL_SERVER_PORT),
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
