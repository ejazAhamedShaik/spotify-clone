import NextAuth, { Account, Awaitable, User } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";
import { NextAuthOptions } from "next-auth";

interface Token {
  accessToken: string;
  accessTokenExpires: number;
  refreshToken?: string;
  error?: string;
}

interface SpotifyAccount {
  access_token: string;
  refresh_token: string;
  providerAccountId: string;
  expires_at: number;
}

async function refreshAccessToken(token: Token): Promise<Token> {
  console.log("token " + token);
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken as string);
    const { body: refreshToken } = await spotifyApi.refreshAccessToken();
    console.log("REFRESHED TOKEN IS ", refreshToken);

    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpires: Date.now() + refreshToken.expires_in * 1000,
      refreshToken: refreshToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      authorization: LOGIN_URL,
    }),
    // ...add more providers heresc
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }: any) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({token, user, account}: any) {
      //Initial Sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          userName: account.providerAccountId,
          accountTokenExpires: account.expires_at * 1000,
        };
      }

      //Return previous token if not expired
      if (Date.now() < token.accessTokenExpires) {
        console.log("EXISTING TOKEN HASN'T EXPIRED");
        return token;
      }

      //Access token expires
      console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
      return await refreshAccessToken(token);
    },
    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.userName = token.userName;
      return session;
    },
  },
};
export default NextAuth(authOptions);
