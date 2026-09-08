import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import { API_BASE_URL } from "@/lib/constants";
import type { ApiResponse, AuthPayload, AuthUser, RegisterRequest } from "@/lib/types";

type CredentialsInput = {
  mode?: "login" | "register";
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: RegisterRequest["role"];
};

type NextAuthUser = AuthUser & {
  accessToken?: string;
  refreshToken?: string;
};

const nextAuthSecret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? "annotex-local-dev-secret";
const TOKEN_EXPIRY_SKEW_MS = 30_000;

function getAccessTokenExpiry(accessToken?: string): number | undefined {
  if (!accessToken) {
    return undefined;
  }

  try {
    const payload = JSON.parse(Buffer.from(accessToken.split(".")[1], "base64url").toString("utf8")) as {
      exp?: number;
    };
    return payload.exp ? payload.exp * 1000 : undefined;
  } catch {
    return undefined;
  }
}

function isAccessTokenExpired(expiresAt?: number): boolean {
  if (!expiresAt) {
    return true;
  }

  return Date.now() + TOKEN_EXPIRY_SKEW_MS >= expiresAt;
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  if (!token.refreshToken) {
    return {
      ...token,
      error: "NoRefreshToken",
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const payload = (await response.json()) as ApiResponse<{
      accessToken: string;
      refreshToken: string;
    }>;

    if (!response.ok || !payload.success || !payload.data?.accessToken) {
      throw new Error(payload.message || "Unable to refresh token");
    }

    return {
      ...token,
      accessToken: payload.data.accessToken,
      refreshToken: payload.data.refreshToken ?? token.refreshToken,
      accessTokenExpiresAt: getAccessTokenExpiry(payload.data.accessToken),
      error: undefined,
    };
  } catch {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  secret: nextAuthSecret,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        mode: { label: "Mode", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        firstName: { label: "First name", type: "text" },
        lastName: { label: "Last name", type: "text" },
        role: { label: "Role", type: "text" },
      },
      async authorize(rawCredentials) {
        const credentials = rawCredentials as CredentialsInput | undefined;
        const mode = credentials?.mode === "register" ? "register" : "login";
        const email = credentials?.email?.trim();
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        const endpoint = `${API_BASE_URL}/auth/${mode}`;
        const body =
          mode === "register"
            ? {
                email,
                password,
                firstName: credentials?.firstName,
                lastName: credentials?.lastName,
                role: credentials?.role ?? "contributor",
              }
            : { email, password };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const payload = (await response.json()) as ApiResponse<AuthPayload>;

        if (!response.ok || !payload.success || !payload.data?.user) {
          // NextAuth surfaces a thrown credentials-provider error to the client
          // when `redirect: false` is used, allowing the form to explain what
          // the backend rejected instead of displaying a generic failure.
          throw new Error(payload.message || "Authentication failed. Please try again.");
        }

        return {
          ...payload.data.user,
          accessToken: payload.data.accessToken,
          refreshToken: payload.data.refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as NextAuthUser;

        token.user = {
          id: authUser.id,
          email: authUser.email,
          firstName: authUser.firstName,
          lastName: authUser.lastName,
          role: authUser.role,
          walletAddress: authUser.walletAddress,
          isActive: authUser.isActive,
          totalEarnings: authUser.totalEarnings,
          tasksCompleted: authUser.tasksCompleted,
          accuracyRate: authUser.accuracyRate,
          createdAt: authUser.createdAt,
        };
        token.accessToken = authUser.accessToken;
        token.refreshToken = authUser.refreshToken;
        token.accessTokenExpiresAt = getAccessTokenExpiry(authUser.accessToken);

        return token;
      }

      if (token.accessToken && !isAccessTokenExpired(token.accessTokenExpiresAt as number | undefined)) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as AuthUser;
      }

      session.accessToken = token.accessToken as string | undefined;
      session.refreshToken = token.refreshToken as string | undefined;
      session.accessTokenExpiresAt = token.accessTokenExpiresAt as number | undefined;
      session.error = token.error as string | undefined;

      return session;
    },
  },
};
