import type { NextAuthConfig } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }: { auth: any; request: NextRequest }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (!isLoggedIn) {
          return true;
        } else if (isLoggedIn) {
          return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
        }
      }
      return true;
    },
  },
  providers: [],
};
