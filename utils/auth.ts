import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compareSync } from "bcrypt-ts"
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "../prisma/generated/client"

const prisma = new PrismaClient()


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },

    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith@mail.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUsr = await prisma.user.findFirst({
          where: { email: credentials?.email },
        });
        if (!existingUsr) {
          return null;
        }

        const passwordMatch = await compareSync(credentials.password, existingUsr.password ?? "");
        if (!passwordMatch) {
          return null;
        }
        return {
          id: existingUsr.id,
          name: existingUsr.name,
          email: existingUsr.email,
          role: existingUsr.role,
        };
      },
    }),
  ],

  // jwt: {
  //   encode({ token, secret }) {
  //     return jsonwebtoken.sign(token || {}, secret);
  //   },
  //   decode({ token, secret }) {
  //     return jsonwebtoken.decode(token || "") as any;
  //   },
  // },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.type === "credentials") {
        token.id = account.providerAccountId;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
};
export const getServerAuthSession = () => getServerSession(authOptions);
