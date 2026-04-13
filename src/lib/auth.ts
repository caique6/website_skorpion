import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

async function fetchYouTubeChannelId(accessToken: string): Promise<string | null> {
  const response = await fetch(
    "https://www.googleapis.com/youtube/v3/channels?part=id&mine=true",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!response.ok) return null;

  const data = await response.json();
  return data?.items?.[0]?.id ?? null;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: [
            "openid",
            "profile",
            "email",
            "https://www.googleapis.com/auth/youtube.readonly",
          ].join(" "),
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email;
        token.picture = profile.picture;
        token.name = profile.name;
        token.accessToken = account.access_token;
      }

      if (token.accessToken && !token.channelId) {
        token.channelId = await fetchYouTubeChannelId(token.accessToken);
      }

      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email ?? null;
      session.user.image = token.picture ?? null;
      session.user.name = token.name ?? null;
      session.user.channelId = token.channelId ?? null;
      return session;
    },
  },
  pages: {
    signIn: "/resgatar",
    error: "/resgatar",
  },
};

export default NextAuth(authOptions);