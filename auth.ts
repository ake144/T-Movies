import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from './auth.config';
import { z } from 'zod';
import { signInSchema } from './utils/types';
import getUser from "./utils/actions/getUser";
import bcrypt from 'bcrypt';

interface User {
  email: string;
 role: string | null;
  username: string;
password: string;
}
export const  {handlers, signIn, signOut, auth} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
    async authorize(credentials): Promise<User | null> {
        const { email, password } = signInSchema.parse(credentials);
        const user = await getUser(email);
        if (!user) {
            throw new Error("User not found.");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            return user;
        } else {
            throw new Error("Password is incorrect.");
        }
    }
    })
  ],
  
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    }
  },
  pages: {
    signIn: "/login",
  }

});
