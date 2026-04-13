import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email;
        token.picture = (profile as { picture?: string }).picture;
        token.name = profile.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email as string;
      session.user.image = token.picture as string;
      session.user.name = token.name as string;
      return session;
    },
  },
  pages: {
    signIn: "/resgatar",
    error: "/resgatar",
  },
};

export default NextAuth(authOptions);