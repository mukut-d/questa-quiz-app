// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyFirebaseToken } from "@/lib/firebase-admin"; // you'll create this

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Firebase",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        const token = credentials?.token;
        if (!token) return null;

        try {
          const decoded = await verifyFirebaseToken(token);
          return {
            id: decoded.uid,
            name: decoded.name || "Firebase User",
            email: decoded.email,
            image: decoded.picture || null,
          };
        } catch (error) {
          console.error("Firebase token error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
