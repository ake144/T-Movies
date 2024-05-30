import NextAuth from "next-auth/next";

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    username: string;
    role: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      role: string | null;
    };
  }
}
