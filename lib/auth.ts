import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from './../utils/types';
import prisma from "@/lib/db";
import bcrypt from 'bcryptjs';

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = signInSchema.parse(credentials);
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
     console.log('user from the auth', user)
        if (!user) {
          throw new Error('User not found.');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log({ passwordMatch, user, email, password });

        if (user && passwordMatch) {
          return {
            id: user.id.toString(), 
            email: user.email,
            password: user.password,
            role: user.role,
            username: user.username,
          };
        } else {
          throw new Error('Password is incorrect.');
        }
      },
    }),
  ],
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log(token,user)
      if (user) {
        return{
           ...token,
        username: user.username,
      }
      }
      return token;
    },
    async session({ session, token }) {
      console.log(session,token)
      if (token) {
         return {
          ...session,
          user:{
            ...session.user,
            username:token.username
          }
         }
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
    signOut: '/profile',
  },
};

export default authOptions;
